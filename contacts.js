const fs = require('fs');

// Function untuk menambahkan kontak
const saveContact = (name, email, mobile) => {
    // Membuat variable untuk path folder
    const dirPath = './data';

    // Cek path folder
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath);
    }

    // Membuat variable untuk path file contacts.json
    const dataPath = 'data/contacts.json';

    // Cek path file contacts.json
    if (!fs.existsSync(dataPath)) {
        fs.writeFileSync(dataPath, '[]', 'utf-8');
    }

    // Parsing file contacts.json menjadi sebuah array
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Membuat object contact berdasarkan name, mobile, dan email
    const contact = {
        name,
        email,
        mobile
    };

    if (contacts.find((kontak) => kontak.name.toUpperCase() === name.toUpperCase())) {
        console.log('Gagal menambahkan! Kontak telah terdaftar');
        return;
    }

    // Menambahkan object contact kedalam array contacts
    contacts.push(contact);

    // Mengoverwrite file contacts.json
    const jsonString = JSON.stringify(contacts);
    fs.writeFileSync(dataPath, jsonString);

    console.log(contact);
    console.log('Kontak berhasil ditambahkan!');
};

const findContact = (name) => {

    // Membuat variable untuk path file contacts.json
    const dataPath = 'data/contacts.json';

    // Parsing file contacts.json menjadi sebuah array
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    // Mencari detail kontak
    const contact = contacts.find(contact => contact.name.toUpperCase() === name.toUpperCase());
    if (!contact) {
        console.log('Kontak tidak ditemukan');
    } else {
        console.log(contact)
    }
};

module.exports = { saveContact, findContact }