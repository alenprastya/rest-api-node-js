'use strict';

exports.ok = function(value, res) {
    var data = {
        'status': 200,
        'values': value
    };
    res.json(data);
    res.end();
}


// Respons Untuk Nested Matakuliah

exports.okNested = function(values, res) {
    // Melakukan Akumulasi 
    const hasil = values.reduce((akumulasikan, item) => {
        // Menentukan Key Group
        if (akumulasikan[item.nama]) {
            // membuat Variabel Group nama Mahasiswa
            const group = akumulasikan[item.nama];
            // Cek jika isi Array adalah matakuliah
            if (Array.isArray(group.matakuliah)) {
                // Tambahkan Value kedalam Group matakuliah
                group.matakuliah.push(item.matakuliah);
            } else {
                group.matakuliah = [group.matakuliah, item.matakuliah];
            }
        } else {
            akumulasikan[item.nama] = item;
        }
        return akumulasikan;
    }, {});

    var data = {
        'status': 200,
        'values': hasil
    };
    res.json(data);
    res.end();

}