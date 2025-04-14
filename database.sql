CREATE TABLE User (
    id_user INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(50) NOT NULL
)

CREATE TABLE Prestataire (
    id_prestataire INT PRIMARY KEY AUTO_INCREMENT,
    profession VARCHAR(100),
    localisation VARCHAR(100),
    entreprise VARCHAR(100),
    note FLOAT,
    user_id INT,
    siret VARCHAR(14),
    FOREIGN KEY (user_id) REFERENCES User(id_user)
)

CREATE TABLE Client (
    id_client INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100),
    localisation VARCHAR(100),
    user_id INT,
    FOREIGN KEY (user_id) REFERENCES User(id_user)
)

CREATE TABLE Service (
    id_service INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT,
    description TEXT,
    prix DECIMAL(10,2),
    prestataire_id INT,
    FOREIGN KEY (prestataire_id) REFERENCES Prestataire(id_prestataire)
)

CREATE TABLE Avis (
    id_avis INT PRIMARY KEY AUTO_INCREMENT,
    service_id INT,
    user_id INT,
    note INT,
    commentaire TEXT,
    FOREIGN KEY (service_id) REFERENCES Service(id_service),
    FOREIGN KEY (user_id) REFERENCES User(id_user)
)

CREATE TABLE Commande (
    id_commande INT PRIMARY KEY AUTO_INCREMENT,
    prestataire_id INT,
    client_id INT,
    prixtot DECIMAL(10,2),
    urgence BOOLEAN,
    date DATE,
    FOREIGN KEY (prestataire_id) REFERENCES Prestataire(id_prestataire),
    FOREIGN KEY (client_id) REFERENCES Client(id_client)
)

CREATE TABLE Message (
    id_message INT PRIMARY KEY AUTO_INCREMENT,
    expéditeur INT,
    destinataire INT,
    texte TEXT,
    date DATETIME,
    FOREIGN KEY (expéditeur) REFERENCES User(id_user),
    FOREIGN KEY (destinataire) REFERENCES User(id_user)
)