let materiels = [
    {
        nom: "VBCI",
        type: "véhicule",
        description: "Véhicule Blindé de Combat d’Infanterie, utilisé pour le transport et le combat.",
        image: "assets/img/vbci.jpg"
    },
    {
        nom: "FAMAS",
        type: "arme",
        description: "Ancien fusil d’assaut de l’armée française.",
        image: "assets/img/famas.jpg"
    },
    {
        nom: "CAESAR",
        type: "véhicule",
        description: "Canon automoteur de 155 mm, utilisé pour l’appui feu.",
        image: "assets/img/caesar.jpg"
    },
    {
        nom: "VBL",
        type: "véhicule",
        description: "Véhicule Blindé Léger, utilisé pour la reconnaissance et le transport.",
        image: "assets/img/vbl.jpg"
    },
    {
        nom: "HK 416 FS",
        type: "arme",
        description: "Nouveau fusil d’assaut standard de l’armée française.",
        image: "assets/img/hk416fs.jpg"
    },
    {
        nom: "Griffon",
        type: "véhicule",
        description: "Véhicule Blindé multi-roles.",
        image: "assets/img/griffon.jpg"
    }
];

function afficherMateriels(filter = 'all', search = '') {
    const grid = document.getElementById('materiel-grid');
    grid.innerHTML = '';

    let filtered = materiels.filter(materiel => {
        const matchesSearch = materiel.nom.toLowerCase().includes(search.toLowerCase()) ||
            materiel.description.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || materiel.type === filter;
        return matchesSearch && matchesFilter;
    });

    filtered.forEach(materiel => {
        const card = document.createElement('div');
        card.className = 'materiel-card';
        card.innerHTML = `
            <img src="${materiel.image || 'assets/img/default-materiel.jpg'}" alt="${materiel.nom}">
            <div class="materiel-card-content">
                <h3>${materiel.nom}</h3>
                <span class="type ${materiel.type}">${materiel.type}</span>
                <p>${materiel.description}</p>
                <div class="actions">
                    <button class="delete-btn" data-nom="${materiel.nom}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Ajout des événements de suppression
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const nom = this.getAttribute('data-nom');
            materiels = materiels.filter(m => m.nom !== nom);
            afficherMateriels(document.getElementById('filter-type').value, document.getElementById('search').value);
        });
    });
}

// Ajout d'un matériel
document.getElementById('add-materiel').addEventListener('submit', function (e) {
    e.preventDefault();
    const nom = document.getElementById('nom').value;
    const type = document.getElementById('type').value;
    const description = document.getElementById('description').value;
    const image = document.getElementById('image').value;

    materiels.push({ nom, type, description, image });
    afficherMateriels(document.getElementById('filter-type').value, document.getElementById('search').value);
    this.reset();
});

// Tri A-Z
document.getElementById('sort-az').addEventListener('click', function () {
    materiels.sort((a, b) => a.nom.localeCompare(b.nom));
    afficherMateriels(document.getElementById('filter-type').value, document.getElementById('search').value);
});

// Tri Z-A
document.getElementById('sort-za').addEventListener('click', function () {
    materiels.sort((a, b) => b.nom.localeCompare(a.nom));
    afficherMateriels(document.getElementById('filter-type').value, document.getElementById('search').value);
});

// Filtre par type
document.getElementById('filter-type').addEventListener('change', function () {
    afficherMateriels(this.value, document.getElementById('search').value);
});

// Recherche en temps réel
document.getElementById('search').addEventListener('input', function () {
    afficherMateriels(document.getElementById('filter-type').value, this.value);
});

// Affichage initial
afficherMateriels();
