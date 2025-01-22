const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "pfa",
});

db.connect((err) => {
  if (err) {
    console.err("Error connectiong to MySQL : ", err);
    return;
  }
  console.log("Connected to MySQL database!");
});
// locaux

//////////////////////////////////////////////////////////
// delete local par id ajouté par Siriiiin
//////////////////////////////////////////////////////////
app.delete('api/locaux/:local_id', (req, res) => {
    const { local_id } = req.params.local_id;
    const query = 'DELETE FROM salle WHERE local_id = ?';
    db.query(query, [local_id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting local');
        } else if (result.affectedRows === 0) {
            res.status(404).send('local not found');
        } else {
            res.send('local deleted successfully');
        }
    });
});

////////////////////////////////////////////////////////////////
// GET local PAR ID AJOUTE PAR SIRIN
////////////////////////////////////////////////////////////////
app.get("/api/locaux/:local_id", (req, res) => {
  const { local_id } = req.params; // Récupérer l'ID du local depuis les paramètres de la requête

  const query = "SELECT * FROM locale WHERE local_id = ?"; // Requête SQL pour sélectionner un local par son ID
  db.query(query, [local_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération du local:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Local non trouvé" }); // Si aucun local n'est trouvé
    } else {
      res.json(results[0]); // Envoyer les données du local en JSON
    }
  });
});
app.put("/api/locaux/:local_id", (req, res) => {
  const { local_id } = req.params; // Récupérer l'ID du local depuis les paramètres de la requête
  const { nom_Local } = req.body; // Récupérer les données à mettre à jour depuis le corps de la requête

  const query = "UPDATE locale SET nom_Local = ? WHERE local_id = ?"; // Requête SQL pour mettre à jour le local
  db.query(query, [nom_Local, local_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour du local:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Local non trouvé" }); // Si aucun local n'est trouvé
    } else {
      res.json({ message: "Local mis à jour avec succès" }); // Réponse de succès
    }
  });
});
  
  //////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

app.get("/api/locaux", (req, res) => {
  db.query("SELECT local_id, nom_Local, dep_id FROM locale", (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results); // Send results as a JSON response
    }
  });
});
// Route pour ajouter un local
app.post("/api/addLocaux", (req, res) => {
  const { nom_Local } = req.body; // Supprimer capacite

  // Requête SQL mise à jour pour insérer uniquement nom_Local
  const query = "INSERT INTO locale (nom_Local) VALUES (?)";
  db.query(query, [nom_Local], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout du local:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json({ message: "Local ajouté avec succès" });
    }
  });
});

app.delete('/api/locaux/:local_id', (req, res) => {
  const { local_id } = req.params; // Récupérer l'ID du local depuis les paramètres de la requête

    const deleteLocaleQuery = 'DELETE FROM locale WHERE local_id = ?';
    db.query(deleteLocaleQuery, [local_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erreur lors de la suppression du local');
      }

      if (result.affectedRows === 0) {
        return res.status(404).send('Local non trouvé');
      }

      // Si tout s'est bien passé
      res.send('Local et enregistrements liés supprimés avec succès');
    });
});


// Equipments

//////////////////////////////////////////////////////////
// delete equipment par id ajouté par Siriiiin
//////////////////////////////////////////////////////////
app.delete('/api/equipements/:equipement_id', (req, res) => {
  const { equipement_id } = req.params; // Correction : Utiliser req.params directement

  // Étape 1 : Supprimer les enregistrements liés dans la table `commande_equipement`
  const deleteCommandEquipementQuery = 'DELETE FROM commande_equipement WHERE equipement_id = ?';
  db.query(deleteCommandEquipementQuery, [equipement_id], (err, result) => {
      if (err) {
          console.error(err);
          return res.status(500).send('Error deleting related records in commande_equipement');
      }

      // Étape 2 : Supprimer l'équipement de la table `equipement`
      const deleteEquipementQuery = 'DELETE FROM equipement WHERE equipement_id = ?';
      db.query(deleteEquipementQuery, [equipement_id], (err, result) => {
          if (err) {
              console.error(err);
              return res.status(500).send('Error deleting equipement');
          }

          if (result.affectedRows === 0) {
              return res.status(404).send('Equipement not found');
          }

          // Si tout s'est bien passé
          res.send('Equipement and related records deleted successfully');
      });
  });
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

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
app.get("/api/equipements/:equipement_id", (req, res) => {
  const { equipement_id } = req.params; // Récupérer l'ID de l'équipement depuis les paramètres de la requête
  const query = "SELECT equipement_id, nom_Equipement, status FROM equipement WHERE equipement_id = ?"; // Requête SQL pour sélectionner un équipement spécifique

  db.query(query, [equipement_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'équipement:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Équipement non trouvé" }); // Si aucun équipement n'est trouvé
    } else {
      res.json(results[0]); // Envoyer le premier résultat (l'équipement) en JSON
    }
  });
});

app.post("/api/addEquipement", (req, res) => {
  const { nom_equipement, status } = req.body;

  const query = `
    INSERT INTO equipement (nom_Equipement, status)
    VALUES (?, ?);
  `;

  db.query(query, [nom_equipement, status], (err, result) => {
    if (err) {
      console.error("Erreur lors de l'ajout de l'équipement:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.status(201).json({ message: "Équipement ajouté avec succès" });
    }
  });
});
app.put("/api/equipements/:equipement_id", (req, res) => {
  const { equipement_id } = req.params; // Récupérer l'ID de l'équipement depuis les paramètres de la requête
  const { nom_Equipement, status } = req.body; // Récupérer les données à mettre à jour depuis le corps de la requête

  // Requête SQL pour mettre à jour l'équipement
  const query = "UPDATE equipement SET nom_Equipement = ?, status = ? WHERE equipement_id = ?";

  db.query(query, [nom_Equipement, status, equipement_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de l'équipement:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Équipement non trouvé" }); // Si aucun équipement n'est trouvé
    } else {
      res.json({ message: "Équipement mis à jour avec succès" }); // Réponse de succès
    }
  });
});

//Commandes

//////////////////////////////////////////////////////////
// delete commande par id ajouté par Siriiiin
//////////////////////////////////////////////////////////
app.delete('/api/commandesDel/:commandId', (req, res) => {
  const { commandId } = req.params; // Utilisez commandId au lieu de command_id

  // Démarrer une transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error starting transaction');
    }

    // 1. Supprimer les enregistrements associés dans commande_equipement
    const deleteCommandeEquipementQuery = 'DELETE FROM commande_equipement WHERE command_id = ?';
    db.query(deleteCommandeEquipementQuery, [commandId], (err, result) => {
      if (err) {
        // Annuler la transaction en cas d'erreur
        return db.rollback(() => {
          console.error(err);
          res.status(500).send('Error deleting from commande_equipement');
        });
      }

      // 2. Supprimer la commande dans la table commandes
      const deleteCommandeQuery = 'DELETE FROM commande WHERE command_id = ?';
      db.query(deleteCommandeQuery, [commandId], (err, result) => {
        if (err) {
          // Annuler la transaction en cas d'erreur
          return db.rollback(() => {
            console.error(err);
            res.status(500).send('Error deleting from commandes');
          });
        }

        // Valider la transaction si tout est réussi
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error(err);
              res.status(500).send('Error committing transaction');
            });
          }

          if (result.affectedRows === 0) {
            res.status(404).send('Commande not found');
          } else {
            res.send('Commande and associated records deleted successfully');
          }
        });
      });
    });
  });
});

///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

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
app.get("/api/commandes/:commandId", (req, res) => {
  const { commandId } = req.params;

  const query = `
    SELECT 
      commande.command_id,
      commande.statut,
      commande.date,
      commande_equipement.equipement_id,
      commande_equipement.quantity,
      equipement.nom_Equipement
    FROM 
      commande
    LEFT JOIN 
      commande_equipement 
    ON 
      commande.command_id = commande_equipement.command_id
    LEFT JOIN 
      equipement 
    ON 
      commande_equipement.equipement_id = equipement.equipement_id
    WHERE 
      commande.command_id = ?;
  `;

  db.query(query, [commandId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la commande :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Commande non trouvée" });
    } else {
      // Structurer les résultats pour renvoyer un objet unique avec les détails de la commande
      const commandeDetails = {
        command_id: results[0].command_id,
        statut: results[0].statut,
        date: results[0].date,
        equipements: results.map((row) => ({
          equipement_id: row.equipement_id,
          nom_Equipement: row.nom_Equipement,
          quantity: row.quantity,
        })),
      };

      res.json(commandeDetails);
    }
  });
});

app.post("/api/ordre", (req, res) => {
  const { articles, status } = req.body; // Récupérer les articles et le statut

  // Validation des données
  if (!articles || !Array.isArray(articles)) {
    return res.status(400).json({ error: "Données de commande invalides" });
  }

  // Vérifier que chaque article a un equipement_id valide
  for (const article of articles) {
    if (!article.equipement_id || isNaN(article.equipement_id)) {
      return res
        .status(400)
        .json({ error: "equipement_id est manquant ou invalide" });
    }
    if (!article.quantity || isNaN(article.quantity)) {
      return res
        .status(400)
        .json({ error: "quantity est manquante ou invalide" });
    }
  }

  // Vérifier que le statut est valide
  if (!status || (status !== "En cours" && status !== "Terminée")) {
    return res.status(400).json({ error: "Statut invalide" });
  }

  // Commencer une transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction:", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }

    // Insérer la commande dans la table `commande` avec le statut
    const insertCommandeQuery = `
      INSERT INTO commande (statut, date)
      VALUES (?, NOW());
    `;

    db.query(insertCommandeQuery, [status], (err, results) => {
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
          db.query(
            insertArticleQuery,
            [commandId, article.equipement_id, article.quantity],
            (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            }
          );
        });
      });

      // Exécuter toutes les insertions d'articles
      Promise.all(insertArticlesPromises)
        .then(() => {
          // Valider la transaction
          db.commit((err) => {
            if (err) {
              db.rollback(() => {
                console.error(
                  "Erreur lors de la validation de la transaction:",
                  err
                );
                res.status(500).json({ error: "Erreur de la base de données" });
              });
              return;
            }
            res
              .status(201)
              .json({ message: "Commande enregistrée avec succès", commandId });
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

app.put("/api/commandes/:commandId", (req, res) => {
  const { commandId } = req.params;
  const { articles } = req.body; // articles est un tableau d'objets { equipement_id, quantity }

  // Démarrer une transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction :", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }

    // Supprimer les anciens enregistrements de commande_equipement pour cette commande
    const deleteQuery = "DELETE FROM commande_equipement WHERE command_id = ?";
    db.query(deleteQuery, [commandId], (err, results) => {
      if (err) {
        return db.rollback(() => {
          console.error("Erreur lors de la suppression des anciens équipements :", err);
          res.status(500).json({ error: "Erreur de la base de données" });
        });
      }

      // Insérer les nouveaux équipements dans commande_equipement
      const insertPromises = articles.map((article) => {
        return new Promise((resolve, reject) => {
          const insertQuery = `
            INSERT INTO commande_equipement (command_id, equipement_id, quantity)
            VALUES (?, ?, ?);
          `;
          db.query(insertQuery, [commandId, article.equipement_id, article.quantity], (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          });
        });
      });

      // Exécuter toutes les insertions
      Promise.all(insertPromises)
        .then(() => {
          // Valider la transaction
          db.commit((err) => {
            if (err) {
              return db.rollback(() => {
                console.error("Erreur lors de la validation de la transaction :", err);
                res.status(500).json({ error: "Erreur de la base de données" });
              });
            }
            res.json({ message: "Commande mise à jour avec succès" });
          });
        })
        .catch((err) => {
          db.rollback(() => {
            console.error("Erreur lors de l'insertion des nouveaux équipements :", err);
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

////////////////////////////////////////////////////////////////
// GET SALLE PAR ID AJOUTE PAR SIRIN
////////////////////////////////////////////////////////////////
app.get("api/salles/:salle_id", (req, res) => {
  const { salle_id } = req.params.salle_id;
  const query = `SELECT salle.salle_id, salle.nom_Salle, locale.nom_Local FROM salle JOIN locale ON salle.local_id = locale.local_id WHERE salle.salle_id = ?`;
  db.query(query, [salle_id], (err, results) => {
    if (err) {
      console.error(
        "Erreur lors de la récupération des détails de la salle",
        err
      );
      res.status(500).send("Erreur de la base de données");
    } else if (results.length === 0) {
      res.status(404).send("Salle non trouvée");
    } else {
      const salleDetails = {
        salle_id: results[0].salle_id,
        nom_salle: results[0].nom_salle,
        nom_local: results[0].nom_local,
      };

      res.json(salleDetails);
    }
  });
});

//////////////////////////////////////////////////////////
// delete salle par id ajouté par Siriiiin
//////////////////////////////////////////////////////////
app.delete("/api/salles/:salle_id", (req, res) => {
  const { salle_id } = req.params;

  const query = "DELETE FROM salle WHERE salle_id = ?";
  db.query(query, [salle_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la suppression de la salle:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Salle non trouvée" });
    } else {
      res.json({ message: "Salle supprimée avec succès" });
    }
  });
});

app.post("/api/salles", (req, res) => {
  const { nom_Salle, local_id } = req.body; // Récupérer nom_Salle et local_id depuis le corps de la requête

  // Vérifier que les champs obligatoires sont présents
  if (!nom_Salle || !local_id) {
    return res.status(400).json({ error: "Veuillez fournir un nom de salle et un local_id" });
  }

  // Requête SQL pour insérer une nouvelle salle avec local_id
  const query = "INSERT INTO salle (nom_Salle, local_id) VALUES (?, ?)";
  db.query(query, [nom_Salle, local_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'ajout de la salle:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json({ message: "Salle ajoutée avec succès", salle_id: results.insertId });
    }
  });
});
////////////////////////////////////////////////////////////////
// GET SALLE PAR ID AJOUTE PAR SIRIN
////////////////////////////////////////////////////////////////
app.get("/api/salles/:salle_id", (req, res) => {
  const { salle_id } = req.params;

  const query = `
    SELECT 
      salle.salle_id, 
      salle.nom_Salle, 
      salle.local_id,
      locale.nom_Local
    FROM 
      salle
    JOIN 
      locale 
    ON 
      salle.local_id = locale.local_id
    WHERE 
      salle.salle_id = ?;
  `;

  db.query(query, [salle_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de la salle:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Salle non trouvée" });
    } else {
      res.json(results[0]); // Renvoyer les détails de la salle, y compris les informations du local
    }
  });
});

////////////////////////////////////////////////////////////////
// PUT SALLE PAR ID AJOUTE PAR SIRIN
////////////////////////////////////////////////////////////////
app.put("/api/salles/:salle_id", (req, res) => {
  const { salle_id } = req.params; // Récupérer l'ID de la salle depuis les paramètres de la requête
  const { nom_Salle, local_id } = req.body; // Récupérer le nouveau nom de la salle et l'ID du local depuis le corps de la requête

  // Requête SQL pour mettre à jour la salle avec le nom et l'ID du local
  const query = "UPDATE salle SET nom_Salle = ?, local_id = ? WHERE salle_id = ?";

  db.query(query, [nom_Salle, local_id, salle_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la mise à jour de la salle:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Salle non trouvée" }); // Si aucune salle n'est trouvée
    } else {
      res.json({ message: "Salle mise à jour avec succès" }); // Réponse de succès
    }
  });
});


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

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
