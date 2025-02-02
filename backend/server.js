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
/*
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
*/
///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

app.get("/api/equipements", (req, res) => {
  const query = `
    SELECT 
      equipement.equipement_id,
      equipement.nom_Equipement,
      equipement.status_equipement,
      salle.nom_salle,
      equipement.command_id
    FROM 
      equipement
    LEFT JOIN 
      salle 
    ON 
      equipement.salle_id = salle.salle_id;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipements :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results);
    }
  });
});
app.get("/api/equipementsByName", (req, res) => {
  const query = `
    SELECT DISTINCT
      equipement.nom_Equipement
    FROM 
      equipement
    WHERE 
      equipement.status_equipement != 'En cours' 
      AND equipement.Archive = 0;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipements :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      // Envoyer les résultats directement (ils sont déjà distincts grâce à DISTINCT)
      res.json(results.map(row => row.nom_Equipement));
    }
  });
});
app.get("/api/equipements-filtre", (req, res) => {
  const query = `
    SELECT 
      equipement.equipement_id,
      equipement.nom_Equipement,
      equipement.status_equipement,
      salle.nom_salle,
      equipement.command_id
    FROM 
      equipement
    LEFT JOIN 
      salle 
    ON 
      equipement.salle_id = salle.salle_id
    WHERE 
      equipement.status_equipement != 'En cours' 
      AND equipement.Archive = 0;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipements :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results);
    }
  });
});
app.get("/api/equipementsByName", (req, res) => {
  const query = `
    SELECT DISTINCT
      equipement.nom_Equipement
    FROM 
      equipement
    WHERE 
      equipement.status_equipement != 'En cours' 
      AND equipement.Archive = 0;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipements :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      // Utilisation de Set pour éviter les doublons
      const nomsEquipements = [...new Set(results.map(row => row.nom_Equipement))];
      res.json(nomsEquipements);
    }
  });
});
app.get("/api/equipements/details/:nomEquipement", (req, res) => {
  const { nomEquipement } = req.params;
  const query = `
    SELECT 
      equipement_id,
      nom_Equipement, 
      status_equipement, 
      salle_id, 
      command_id, 
      quantity
    FROM equipement
    WHERE nom_Equipement = ? AND \`archive\` = 0 AND status_equipement != 'En cours' ;
  `;

  db.query(query, [nomEquipement], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des détails :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results);
    }
  });
});

app.get("/api/equipements/archived", (req, res) => {
  const query = `
    SELECT 
      equipement.equipement_id,
      equipement.nom_Equipement,
      equipement.status_equipement,
      salle.nom_salle,
      equipement.command_id
    FROM 
      equipement
    LEFT JOIN 
      salle 
    ON 
      equipement.salle_id = salle.salle_id
    WHERE 
      equipement.Archive = 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipements archivés :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results); // Envoyer les résultats en JSON
    }
  });
});


app.get("/api/equipements/:equipement_id", (req, res) => {
  const { equipement_id } = req.params; // Récupérer l'ID de l'équipement depuis les paramètres de la requête

  const query = `
    SELECT 
      equipement.equipement_id,
      equipement.nom_Equipement,
      equipement.status_equipement,
      salle.nom_Salle,
      salle.salle_id,
      salle.local_id -- Ajouter le local_id de la salle
    FROM 
      equipement
    LEFT JOIN 
      salle 
    ON 
      equipement.salle_id = salle.salle_id
    WHERE 
      equipement.equipement_id = ?;
  `; // Requête SQL pour sélectionner un équipement spécifique avec le nom de la salle et le local_id

  db.query(query, [equipement_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération de l'équipement:", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.length === 0) {
      res.status(404).json({ error: "Équipement non trouvé" }); // Si aucun équipement n'est trouvé
    } else {
      res.json(results[0]); // Envoyer le premier résultat (l'équipement avec le nom de la salle et le local_id) en JSON
    }
  });
});

app.get("/api/locaux/:local_id/salles", (req, res) => {
  const { local_id } = req.params;
  const query = "SELECT * FROM salle WHERE local_id = ?";
  db.query(query, [local_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results);
    }
  });
});
app.post("/api/addEquipement", (req, res) => {
  const { nom_equipement, status, salle_id } = req.body;

  // Vérifier si les champs obligatoires sont présents
  if (!nom_equipement || !status) {
    return res.status(400).json({ error: "Veuillez fournir un nom d'équipement et un statut." });
  }

  // Requête SQL pour insérer un nouvel équipement avec salle_id
  const query = `
    INSERT INTO equipement (nom_Equipement, 	status_equipement, salle_id)
    VALUES (?, ?, ?);
  `;

  // Exécuter la requête avec les valeurs fournies
  db.query(query, [nom_equipement, status, salle_id || null], (err, result) => {
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
  const { nom_Equipement, status_equipement, salle_id } = req.body; // Récupérer les données à mettre à jour depuis le corps de la requête

  // Vérifier si les champs obligatoires sont présents
  if (!nom_Equipement || !status_equipement) {
    return res.status(400).json({ error: "Veuillez fournir un nom d'équipement et un statut." });
  }

  // Convertir salle_id en NULL si c'est une chaîne vide
  const salleIdValue = salle_id === "" ? null : salle_id;

  // Requête SQL pour mettre à jour l'équipement
  const query = `
    UPDATE equipement 
    SET nom_Equipement = ?, status_equipement = ?, salle_id = ?
    WHERE equipement_id = ?;
  `;

  // Exécuter la requête avec les valeurs fournies
  db.query(query, [nom_Equipement, status_equipement, salleIdValue, equipement_id], (err, results) => {
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
app.put("/api/equipements/archive/:equipement_id", (req, res) => {
  const { equipement_id } = req.params;
  const query = "UPDATE equipement SET archive = TRUE WHERE equipement_id = ?";
  db.query(query, [equipement_id], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Erreur de la base de données" });
    } else if (results.affectedRows === 0) {
      res.status(404).json({ error: "Équipement non trouvé" });
    } else {
      res.json({ message: "Équipement archivé avec succès" });
    }
  });
});

app.put("/api/equipements/restore/:equipement_id", (req, res) => {
  const { equipement_id } = req.params;

  const query = `
    UPDATE equipement
    SET archive = 0
    WHERE equipement_id = ?;
  `;

  db.query(query, [equipement_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la restauration de l'équipement :", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }

    if (results.affectedRows === 0) {
      return res.status(404).json({ error: "Équipement non trouvé" });
    }

    res.json({ message: "Équipement restauré avec succès" });
  });
});




//Commandes

//////////////////////////////////////////////////////////
// delete commande par id ajouté par Siriiiin
//////////////////////////////////////////////////////////
app.delete("/api/commandesDel/:commandId", (req, res) => {
  const commandId = req.params.commandId;

  // Récupérer le statut de la commande
  const getCommandeStatusQuery = `SELECT status_cmd FROM commande WHERE command_id = ?`;
  db.query(getCommandeStatusQuery, [commandId], (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération du statut de la commande :", err);
      return res.status(500).json({ error: "Erreur serveur" });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Commande non trouvée" });
    }

    const statut = result[0].statut;

    // Si la commande est terminée, mettre command_id à 0 dans la table equipement
    if (statut === "Terminée") {
      const updateEquipementQuery = `UPDATE equipement SET command_id = 0 WHERE command_id = ?`;
      db.query(updateEquipementQuery, [commandId], (err, result) => {
        if (err) {
          console.error("Erreur lors de la mise à jour des équipements :", err);
          return res.status(500).json({ error: "Erreur serveur" });
        }

        // Supprimer la commande
        const deleteCommandeQuery = `DELETE FROM commande WHERE command_id = ?`;
        db.query(deleteCommandeQuery, [commandId], (err, result) => {
          if (err) {
            console.error("Erreur lors de la suppression de la commande :", err);
            return res.status(500).json({ error: "Erreur serveur" });
          }

          return res.status(200).json({ message: "Commande supprimée et équipements mis à jour" });
        });
      });
    } else {
      // Si la commande est en cours, mettre à jour les équipements associés
      const updateEquipementQuery = `UPDATE equipement SET command_id = NULL WHERE command_id = ?`;
      db.query(updateEquipementQuery, [commandId], (err, result) => {
        if (err) {
          console.error("Erreur lors de la mise à jour des équipements :", err);
          return res.status(500).json({ error: "Erreur serveur" });
        }

        // Supprimer la commande
        const deleteCommandeQuery = `DELETE FROM commande WHERE command_id = ?`;
        db.query(deleteCommandeQuery, [commandId], (err, result) => {
          if (err) {
            console.error("Erreur lors de la suppression de la commande :", err);
            return res.status(500).json({ error: "Erreur serveur" });
          }

          return res.status(200).json({ message: "Commande supprimée et équipements mis à jour" });
        });
      });
    }
  });
});


///////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

app.get("/api/commandes", (req, res) => {
  const query = `
    SELECT 
      commande.command_id, 
      commande.status_cmd,
      commande.date
    FROM 
      commande
    WHERE 
      archive_commande = 0;
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
      commande.status_cmd,
      commande.date,
      equipement.equipement_id,
      equipement.nom_Equipement,
      equipement.quantity,
      equipement.status_equipement,
      equipement.salle_id,
      equipement.commande_terminee
    FROM 
      commande
    LEFT JOIN 
      equipement 
    ON 
      commande.command_id = equipement.command_id
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
        status_cmd: results[0].status_cmd,
        date: results[0].date,
        equipements: results
          .filter((row) => row.equipement_id !== null) // Exclure les lignes sans équipement
          .map((row) => ({
            equipement_id: row.equipement_id,
            nom_Equipement: row.nom_Equipement,
            quantity: row.quantity,
            status_equipement: row.status_equipement,
            salle_id: row.salle_id,
            commande_terminee: row.commande_terminee,
          })),
      };

      res.json(commandeDetails);
    }
  });
});

app.get("/api/equipementsCommand/:commandId", (req, res) => {
  const { commandId } = req.params;

  const query = `
    SELECT nom_Equipement, COUNT(*) AS quantity
    FROM equipement
    WHERE command_id = ?
    GROUP BY nom_Equipement;
  `;

  db.query(query, [commandId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des équipements :", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }

    res.json(results);
  });
});

app.post("/api/commande", (req, res) => {
  const { articles, status_cmd } = req.body; // Récupérer les articles et le statut

  // Validation des données
  if (!articles || !Array.isArray(articles)) {
    return res.status(400).json({ error: "Données de commande invalides" });
  }

  // Vérifier que chaque article a un nom d'équipement et une quantité valide
  for (const article of articles) {
    if (!article.nom_Equipement || typeof article.nom_Equipement !== "string") {
      return res
        .status(400)
        .json({ error: "nom_Equipement est manquant ou invalide" });
    }
    if (!article.quantity || isNaN(article.quantity) || article.quantity < 1) {
      return res
        .status(400)
        .json({ error: "quantity est manquante ou invalide" });
    }
  }

  // Vérifier que le statut est valide
  if (!status_cmd || (status_cmd !== "En cours" && status_cmd !== "Terminée")) {
    return res.status(400).json({ error: "Statut invalide" });
  }

  // Commencer une transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction:", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }

    // Insérer la commande dans la table `commande`
    const insertCommandeQuery = `
      INSERT INTO commande (status_cmd, date)
      VALUES (?, NOW());
    `;

    db.query(insertCommandeQuery, [status_cmd], (err, results) => {
      if (err) {
        db.rollback(() => {
          console.error("Erreur lors de l'insertion de la commande:", err);
          res.status(500).json({ error: "Erreur de la base de données" });
        });
        return;
      }

      const commandId = results.insertId; // Récupérer l'ID de la commande insérée

      // Définir le statut de l'équipement et commande_terminee en fonction du statut de la commande
      const status_equipement = status_cmd === "Terminée" ? "Disponible" : "En cours";
      const commande_terminee = status_cmd === "Terminée" ? 1 : 0;

      // Créer les équipements associés à la commande
      const insertEquipementsPromises = articles.flatMap((article) => {
        const equipements = [];
        for (let i = 0; i < article.quantity; i++) {
          equipements.push(
            new Promise((resolve, reject) => {
              const insertEquipementQuery = `
                INSERT INTO equipement (nom_Equipement, status_equipement, command_id, commande_terminee)
                VALUES (?, ?, ?, ?);
              `;
              db.query(
                insertEquipementQuery,
                [article.nom_Equipement, status_equipement, commandId, commande_terminee],
                (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  }
                }
              );
            })
          );
        }
        return equipements;
      });

      // Exécuter toutes les insertions d'équipements
      Promise.all(insertEquipementsPromises)
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
            res.status(201).json({
              message: "Commande et équipements enregistrés avec succès",
              commandId,
            });
          });
        })
        .catch((err) => {
          db.rollback(() => {
            console.error("Erreur lors de l'insertion des équipements:", err);
            res.status(500).json({ error: "Erreur de la base de données" });
          });
        });
    });
  });
});

app.put("/api/commandes/:commandId", (req, res) => {
  const { commandId } = req.params;
  const { articles, status_cmd } = req.body;

  // Validation des données
  if (!articles || !Array.isArray(articles)) {
    return res.status(400).json({ error: "Données de commande invalides" });
  }

  // Vérifier que chaque article a un nom d'équipement et une quantité valide
  for (const article of articles) {
    if (!article.nom_Equipement || typeof article.nom_Equipement !== "string") {
      return res
        .status(400)
        .json({ error: "nom_Equipement est manquant ou invalide" });
    }
    if (!article.quantity || isNaN(article.quantity) || article.quantity < 1) {
      return res
        .status(400)
        .json({ error: "quantity est manquante ou invalide" });
    }
  }

  // Vérifier que le statut est valide
  if (!status_cmd || (status_cmd !== "En cours" && status_cmd !== "Terminée")) {
    return res.status(400).json({ error: "Statut invalide" });
  }

  // Démarrer une transaction
  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction :", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }

    // 1. Mettre à jour le statut de la commande dans la table `commande`
    const updateCommandeQuery = `
      UPDATE commande
      SET status_cmd = ?
      WHERE command_id = ?;
    `;

    db.query(updateCommandeQuery, [status_cmd, commandId], (err, results) => {
      if (err) {
        return db.rollback(() => {
          console.error("Erreur lors de la mise à jour du statut de la commande :", err);
          res.status(500).json({ error: "Erreur de la base de données" });
        });
      }

      // 2. Récupérer les équipements actuels de la commande
      const getCurrentEquipementsQuery = `
        SELECT nom_Equipement, COUNT(*) AS currentQuantity
        FROM equipement
        WHERE command_id = ?
        GROUP BY nom_Equipement;
      `;

      db.query(getCurrentEquipementsQuery, [commandId], (err, currentEquipements) => {
        if (err) {
          return db.rollback(() => {
            console.error("Erreur lors de la récupération des équipements actuels :", err);
            res.status(500).json({ error: "Erreur de la base de données" });
          });
        }

        // 3. Identifier les équipements à supprimer complètement
        const currentEquipementNames = currentEquipements.map((eq) => eq.nom_Equipement);
        const newEquipementNames = articles.map((article) => article.nom_Equipement);

        const equipementsToDelete = currentEquipementNames.filter(
          (name) => !newEquipementNames.includes(name)
        );

        // 4. Supprimer les équipements qui ne sont plus dans la liste
        const deletePromises = equipementsToDelete.map((nom_Equipement) => {
          return new Promise((resolve, reject) => {
            const deleteQuery = `
              DELETE FROM equipement
              WHERE command_id = ? AND nom_Equipement = ?;
            `;
            db.query(deleteQuery, [commandId, nom_Equipement], (err, results) => {
              if (err) {
                reject(err);
              } else {
                resolve(results);
              }
            });
          });
        });

        // 5. Comparer les quantités actuelles avec les nouvelles quantités pour les équipements restants
        const updates = articles.map((article) => {
          const currentEquipement = currentEquipements.find(
            (eq) => eq.nom_Equipement === article.nom_Equipement
          );
          const currentQuantity = currentEquipement ? currentEquipement.currentQuantity : 0;
          const quantityDifference = article.quantity - currentQuantity;

          return { ...article, quantityDifference };
        });

        // 6. Appliquer les modifications pour les équipements restants
        const insertPromises = updates.flatMap((article) => {
          const { nom_Equipement, quantityDifference } = article;
          const status_equipement = status_cmd === "Terminée" ? "Disponible" : "En cours";
          const commande_terminee = status_cmd === "Terminée" ? 1 : 0;

          if (quantityDifference > 0) {
            // Ajouter de nouveaux équipements
            return Array.from({ length: quantityDifference }).map(() => {
              return new Promise((resolve, reject) => {
                const insertQuery = `
                  INSERT INTO equipement (nom_Equipement, status_equipement, command_id, commande_terminee)
                  VALUES (?, ?, ?, ?);
                `;
                db.query(
                  insertQuery,
                  [nom_Equipement, status_equipement, commandId, commande_terminee],
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
          } else if (quantityDifference < 0) {
            // Supprimer les équipements excédentaires
            const deleteQuery = `
              DELETE FROM equipement
              WHERE command_id = ? AND nom_Equipement = ?
              LIMIT ?;
            `;
            return new Promise((resolve, reject) => {
              db.query(
                deleteQuery,
                [commandId, nom_Equipement, -quantityDifference],
                (err, results) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(results);
                  }
                }
              );
            });
          } else {
            return [];
          }
        });

        // 7. Si la commande est terminée, mettre à jour le statut de tous les équipements associés à "Disponible"
        const updateStatusPromises = [];
        if (status_cmd === "Terminée") {
          const updateStatusQuery = `
            UPDATE equipement
            SET status_equipement = 'Disponible'
            WHERE command_id = ?;
          `;
          updateStatusPromises.push(
            new Promise((resolve, reject) => {
              db.query(updateStatusQuery, [commandId], (err, results) => {
                if (err) {
                  reject(err);
                } else {
                  resolve(results);
                }
              });
            })
          );
        }

        // 8. Exécuter toutes les modifications (suppressions, insertions et mise à jour du statut)
        Promise.all([...deletePromises, ...insertPromises, ...updateStatusPromises])
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
              console.error("Erreur lors de la mise à jour des équipements :", err);
              res.status(500).json({ error: "Erreur de la base de données" });
            });
          });
      });
    });
  });
});

app.get("/api/commandeArchiver", (req, res) => {
  const query = `
    SELECT 
      commande.command_id,
      commande.status_cmd,
      commande.date,
      utilisateur.nom
    FROM 
      commande
    LEFT JOIN 
      utilisateur 
    ON 
      commande.utilisateur_id = utilisateur.utilisateur_id
    WHERE 
      commande.archive_commande = 1;
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des commandes archivées :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results); // Envoyer les résultats en JSON
    }
  });
});

app.put("/api/commandes/archive/:id", (req, res) => {
  const commandId = req.params.id;
  const query = `
    UPDATE commande
    SET archive_commande = 1
    WHERE command_id = ?;
  `;

  db.query(query, [commandId], (err, results) => {
    if (err) {
      console.error("Erreur lors de l'archivage de la commande :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json({ message: "Commande archivée avec succès" });
    }
  });
});

app.put("/api/commandes/restore/:id", (req, res) => {
  const commandId = req.params.id;
  const query = `
    UPDATE commande
    SET archive_commande = 0
    WHERE command_id = ?;
  `;

  db.query(query, [commandId], (err, results) => {
    if (err) {
      console.error("Erreur lors de la restauration de la commande :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      // Vérifier si une ligne a été mise à jour
      if (results.affectedRows === 0) {
        res.status(404).json({ error: "Commande non trouvée" });
      } else {
        res.json({ message: "Commande restaurée avec succès" });
      }
    }
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

app.get("/api/salles/:local_id", (req, res) => {
  const { local_id } = req.params;
  const query = "SELECT * FROM salle WHERE local_id = ?";
  db.query(query, [local_id], (err, results) => {
    if (err) {
      console.error("Erreur lors de la récupération des salles :", err);
      res.status(500).json({ error: "Erreur de la base de données" });
    } else {
      res.json(results);
    }
  });
});

//////////////////////////////////////////////////////////
// delete salle 
//////////////////////////////////////////////////////////
app.delete("/api/salles/:salle_id", (req, res) => {
  const { salle_id } = req.params;

  db.beginTransaction((err) => {
    if (err) {
      console.error("Erreur lors du début de la transaction:", err);
      return res.status(500).json({ error: "Erreur de la base de données" });
    }
    const updateEquipementQuery = "UPDATE equipement SET status_equipement = 'Disponible' WHERE salle_id = ?";
    db.query(updateEquipementQuery, [salle_id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          console.error("Erreur lors de la mise à jour des équipements:", err);
          res.status(500).json({ error: "Erreur de la base de données" });
        });
      }
    const deleteSalleQuery = "DELETE FROM salle WHERE salle_id = ?";
    db.query(deleteSalleQuery, [salle_id], (err, results) => {
      if (err) {
        return db.rollback(() => {
          console.error("Erreur lors de la suppression de la salle:", err);
          res.status(500).json({ error: "Erreur de la base de données" });
        });
      }

      if (results.affectedRows === 0) {
        return db.rollback(() => {
          res.status(404).json({ error: "Salle non trouvée" });
        });
      }
        // Commit de la transaction
        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Erreur lors du commit de la transaction:", err);
              res.status(500).json({ error: "Erreur de la base de données" });
            });
          }

          res.json({
            message: "Salle supprimée avec succès et équipements mis à jour",
            equipementsUpdated: results.affectedRows,
          });
        });
      });
    });
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
app.get("/api/salleGet/:salle_id", (req, res) => {
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
          status_equipement, 
            COUNT(*) as value 
        FROM equipement 
        GROUP BY status_equipement;
    `; 

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
