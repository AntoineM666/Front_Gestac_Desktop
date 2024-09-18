// main.js

// Modules to control application life and create native browser window
const {
  app,
  BrowserWindow
} = require('electron')
const sqlite3 = require('sqlite3').verbose()
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    icon: path.join(__dirname, '/icon.ico'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// Quitter l'application lorsque toutes les fenêtres sont fermées, sauf sur macOS où il est courant pour les applications et leur barre de menu de rester actives jusqu'à ce que l'utilisateur quitte explicitement en utilisant Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

// base de donnée

//création de la bdd
let db = new sqlite3.Database('./myDatabase.db', (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the database.');

//condition pour savoir si lutilisateur existe et le redirection associée
  const tableExistsQuery = `SELECT name FROM sqlite_master WHERE type='table' AND name='user';`;
  const getUserQuery = `SELECT * FROM user LIMIT 1;`;

  db.get(tableExistsQuery, (err, row) => {
    if (err) {
      console.error(err.message);
      // En cas d'erreur, afficher un message d'erreur
      console.log('Erreur lors de la vérification de la table user dans la base de données.');
    } else {
      if (row) {
        console.log('La table user existe dans la base de données.');
        // Vérifier si la table contient déjà un utilisateur
        db.get(getUserQuery, (err, row) => {
          if (err) {
            console.error(err.message);
            // En cas d'erreur, afficher un message d'erreur
            console.log("Erreur lors de la récupération d'un utilisateur depuis la table user.");
          } else {
            if (row) {
              console.log('Un utilisateur existe déjà dans la table user.');
              // Si un utilisateur existe, rediriger vers index.html
              const {
                app,
                BrowserWindow
              } = require('electron');
              let mainWindow = new BrowserWindow({
                width: 800,
                height: 600
              });
              mainWindow.loadFile('index.html');
            } else {
              console.log("Aucun utilisateur n'existe dans la table user.");
              // Si la table ne contient pas d'utilisateur, rediriger vers register.html
              const {
                app,
                BrowserWindow
              } = require('electron');
              let mainWindow = new BrowserWindow({
                width: 800,
                height: 600
              });
              mainWindow.loadFile('pages/register.html');
            }
          }
        });
      } else {
        console.log("La table user n'existe pas dans la base de données.");
        // Si la table n'existe pas, créer la table user et rediriger vers register.html
        const createTableQuery = `CREATE TABLE user (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT UNIQUE NOT NULL, password TEXT NOT NULL);`;
        db.run(createTableQuery, (err) => {
          if (err) {
            console.error(err.message);
            // En cas d'erreur, afficher un message d'erreur
            console.log("Erreur lors de la création de la table user dans la base de données.");
          } else {
            console.log('La table user a été créée dans la base de données.');
            // Rediriger vers register.html
            const {
              app,
              BrowserWindow
            } = require('electron');
            let mainWindow = new BrowserWindow({
              width: 800,
              height: 600
            });
            mainWindow.loadFile('index.html');
          }
        });
      }
    }
  });


  app.on('ready', () => {



  })
});