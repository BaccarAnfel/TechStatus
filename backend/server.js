const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'pfa'
});

db.connect((err) => {
    if(err) {
        console.err('Error connectiong to MySQL : ', err);
        return;
    }
    console.log('Connected to MySQL database!');
});

app.get('/api/locaux', (req, res) => {
    db.query('SELECT local_id, nom_Local, dep_id FROM locale', (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Erreur de la base de données' });
        } else {
            res.json(results); // Send results as a JSON response
        }
    });
});
app.get("/api/equipements", (req, res) => {
    const query = "SELECT equipement_id, nom_Equipement, status FROM equipement"; // Requête SQL pour sélectionner tous les équipements
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des équipements:", err);
        res.status(500).json({ error: "Erreur de la base de données" });
      } else {
        res.json(results); // Envoyer les résultats en JSON
      }
    });
});

//Commandes
app.get("/api/commandes", (req, res) => {
    const query = `
      SELECT 
        commande.command_id, 
        commande.statut, 
        commande.date
      FROM 
        commande 
    `;
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des commandes:", err);
        res.status(500).json({ error: "Erreur de la base de données" });
      } else {
        res.json(results); // Envoyer les résultats en JSON
      }
    });
});
app.get("/api/commandes/:command_id", (req, res) => {
    const command_id = req.params.command_id; // Récupérer l'ID de la commande depuis les paramètres de l'URL

    const query = `
      SELECT 
        commande.command_id, 
        commande.statut, 
        commande.date, 
        Equipement.nom_Equipement AS nom_Equipement, 
        commande_equipement.quantity
      FROM 
        commande 
      JOIN 
        commande_equipement 
      ON 
        commande.command_id = commande_equipement.command_id 
      JOIN 
        Equipement 
      ON 
        commande_equipement.equipement_id = Equipement.equipement_id 
      WHERE 
        commande.command_id = ?;
    `;

    db.query(query, [command_id], (err, results) => {
        if (err) {
            console.error("Erreur lors de la récupération des détails de la commande:", err);
            res.status(500).json({ error: "Erreur de la base de données" });
        } else if (results.length === 0) {
            res.status(404).json({ error: "Commande non trouvée" }); // Si aucune commande n'est trouvée
        } else {
            // Structurer les résultats pour renvoyer un objet unique avec les détails de la commande
            const orderDetails = {
                command_id: results[0].command_id,
                statut: results[0].statut,
                date: results[0].date,
                equipements: results.map((row) => ({
                    nom: row.nom_Equipement, // Utiliser le nom de l'équipement
                    quantite: row.quantity,
                })),
            };

            res.json(orderDetails); // Envoyer les résultats en JSON
        }
    });
});
app.post("/api/ordre", (req, res) => {
    const { articles } = req.body; // Récupérer uniquement les articles

    // Validation des données
    if (!articles || !Array.isArray(articles)) {
        return res.status(400).json({ error: "Données de commande invalides" });
    }

    // Vérifier que chaque article a un equipement_id valide
    for (const article of articles) {
        if (!article.equipement_id || isNaN(article.equipement_id)) {
            return res.status(400).json({ error: "equipement_id est manquant ou invalide" });
        }
        if (!article.quantity || isNaN(article.quantity)) {
            return res.status(400).json({ error: "quantity est manquante ou invalide" });
        }
    }

    // Commencer une transaction
    db.beginTransaction((err) => {
        if (err) {
            console.error("Erreur lors du début de la transaction:", err);
            return res.status(500).json({ error: "Erreur de la base de données" });
        }

        // Insérer la commande dans la table `commande` sans utilisateur_id
        const insertCommandeQuery = `
            INSERT INTO commande (statut, date)
            VALUES ('En attente', NOW());
        `;

        db.query(insertCommandeQuery, (err, results) => {
            if (err) {
                db.rollback(() => {
                    console.error("Erreur lors de l'insertion de la commande:", err);
                    res.status(500).json({ error: "Erreur de la base de données" });
                });
                return;
            }

            const commandId = results.insertId; // Récupérer l'ID de la commande insérée

            // Insérer chaque article dans la table `commande_equipement`
            const insertArticlesPromises = articles.map((article) => {
                return new Promise((resolve, reject) => {
                    const insertArticleQuery = `
                        INSERT INTO commande_equipement (command_id, equipement_id, quantity)
                        VALUES (?, ?, ?);
                    `;
                    db.query(insertArticleQuery, [commandId, article.equipement_id, article.quantity], (err, results) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                });
            });

            // Exécuter toutes les insertions d'articles
            Promise.all(insertArticlesPromises)
                .then(() => {
                    // Valider la transaction
                    db.commit((err) => {
                        if (err) {
                            db.rollback(() => {
                                console.error("Erreur lors de la validation de la transaction:", err);
                                res.status(500).json({ error: "Erreur de la base de données" });
                            });
                            return;
                        }
                        res.status(201).json({ message: "Commande enregistrée avec succès", commandId });
                    });
                })
                .catch((err) => {
                    db.rollback(() => {
                        console.error("Erreur lors de l'insertion des articles:", err);
                        res.status(500).json({ error: "Erreur de la base de données" });
                    });
                });
        });
    });
});

//les salles
app.get("/api/salles", (req, res) => {
    const query = `
      SELECT 
        salle.salle_id, 
        salle.nom_Salle, 
        locale.nom_Local 
      FROM 
        salle 
      JOIN 
        locale 
      ON 
        salle.local_id = locale.local_id;
    `; // Requête SQL pour sélectionner les salles avec le nom du local
  
    db.query(query, (err, results) => {
      if (err) {
        console.error("Erreur lors de la récupération des salles:", err);
        res.status(500).json({ error: "Erreur de la base de données" });
      } else {
        res.json(results); // Envoyer les résultats en JSON
      }
    });
});

//Dashbord 
app.get("/api/total-orders", (req, res) => {
    const query = "SELECT COUNT(*) as total FROM commande"; // Query to count total orders

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching total orders:", err);
            res.status(500).json({ error: "Erreur de la base de données" });
        } else {
            res.json({ total: results[0].total }); // Send the total count as JSON
        }
    });
});

app.get("/api/total-equipments", (req, res) => {
    const query = "SELECT COUNT(*) as total FROM equipement"; // Query to count total equipment

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching total equipment:", err);
            res.status(500).json({ error: "Erreur de la base de données" });
        } else {
            res.json({ total: results[0].total }); // Send the total count as JSON
        }
    });
});
app.get("/api/orders-per-month", (req, res) => {
    const query = `
        SELECT 
            DATE_FORMAT(date, '%Y-%m') as month, 
            COUNT(*) as orders 
        FROM commande 
        GROUP BY DATE_FORMAT(date, '%Y-%m') 
        ORDER BY month;
    `; // Query to count orders per month

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching orders per month:", err);
            res.status(500).json({ error: "Erreur de la base de données" });
        } else {
            res.json(results); // Send the results as JSON
        }
    });
});

app.get("/api/equipment-status", (req, res) => {
    const query = `
        SELECT 
            status, 
            COUNT(*) as value 
        FROM equipement 
        GROUP BY status;
    `; // Query to count equipment by status

    db.query(query, (err, results) => {
        if (err) {
            console.error("Error fetching equipment status:", err);
            res.status(500).json({ error: "Erreur de la base de données" });
        } else {
            res.json(results); // Send the results as JSON
        }
    });
});


app.listen(5000, () => {
    console.log("server running");
});