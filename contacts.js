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
    writeFileContacts(contacts);

    console.log(contact);
    console.log('Kontak berhasil ditambahkan!');
};

// Function untuk mencari kontak
const findContact = (name) => {

    // Parsing file contacts.json menjadi sebuah array
    const contacts = readFileContacts();

    // Mencari detail kontak
    const contact = contacts.find(contact => contact.name.toUpperCase() === name.toUpperCase());
    if (!contact) {
        console.log('Kontak tidak ditemukan');
    } else {
        console.log(contact)
    }
};

// Function untuk menampilkan seluruh kontak
const listContact = () => {

    // Parsing file contacts.json menjadi sebuah array
    const contacts = readFileContacts();

    // Menampilkan seluruh kontak
    let count = 0;

    if (contacts.length > 0) {
        contacts.forEach(contact => {
            count++;
            console.log(`${count}. ${contact.name} - ${contact.mobile}`);
        });
        return;
    }

    console.log('Kontak kosong');
};

const deleteContact = (name) => {

    // Parsing file contacts.json menjadi sebuah array
    const contacts = readFileContacts();

    // Mencari detail kontak
    const contact = contacts.find(contact => contact.name.toUpperCase() === name.toUpperCase());
    if (!contact) {
        console.log('Kontak tidak ditemukan');
    } else {

        let result = [];
        for (let i = 0; i < contacts.length; i++) {
            const contact = contacts[i];
            if (contact.name.toUpperCase() === name.toUpperCase()) {
                continue;
            }
            result.push(contact);
        }

        // Mengoverwrite file contacts.json
        writeFileContacts(result);

        console.log('Kontak berhasil dihapus!');
    }
};

const updateContact = (oldName, newName, email, mobile) => {

    // Parsing file contacts.json menjadi sebuah array
    const contacts = readFileContacts();

    const index = contacts.findIndex(contact => contact.name.toUpperCase() === oldName.toUpperCase());
    if (index === -1) {
        console.log('Kontak tidak ditemukan');
        return;
    }

    const checkDuplicate = contacts.find(contact => contact.name.toUpperCase() === newName.toUpperCase());
    if (checkDuplicate) {
        console.log('Nama sudah digunakan');
        return;
    }
    contacts[index].name = newName;
    contacts[index].email = email;
    contacts[index].mobile = mobile;

    // Mengoverwrite file contacts.json
    writeFileContacts(contacts);

    console.log('Kontak berhasil diupdate!');
};

const readFileContacts = () => {
    // Membuat variable untuk path file contacts.json
    const dataPath = 'data/contacts.json';

    // Parsing file contacts.json menjadi sebuah array
    const contacts = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    return contacts;
};

const writeFileContacts = (contacts) => {
    // Membuat variable untuk path file contacts.json
    const dataPath = 'data/contacts.json';

    // Mengoverwrite file contacts.json
    const jsonString = JSON.stringify(contacts);
    fs.writeFileSync(dataPath, jsonString);
};

module.exports = { saveContact, findContact, listContact, deleteContact, updateContact }