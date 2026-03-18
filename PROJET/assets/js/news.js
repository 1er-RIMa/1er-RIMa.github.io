// Données d'actualités
let news = [
    {
        titre: "Des drones en essaims pour la guerre de demain",
        contenu: "En Estonie, les hommes du colonel Bignon ont accéléré leurs expérimentations par drones « en essaims », poussées par IA. Avec de résultats probants à la clé, qui doivent toutefois être validés.",
        categorie: "opérations",
        date: "17 mars 2026",
        image: "assets/img/estonie.jpg"
    },
    {
        titre: "Nouveau chef de corps",
        contenu: "Le colonel Aymeric Caussin a pris le commandement du 1er RIMa lors d’une cérémonie solennelle en présence des autorités militaires.",
        categorie: "vie",
        date: "16 juillet 2025",
        image: "assets/img/nouveau-chef.jpg"
    },
    {
        titre: "Exercice",
        contenu: "Le régiment mènera un exercice militaire en secteur civil en Charente-Maritime, du 16 au 27 mars.",
        categorie: "opérations",
        date: "16 mars 2026",
        image: "assets/img/exercice.jpg"
    },
    {
        titre: "Journée portes ouvertes",
        contenu: "À l'occasion du Circuit des Remparts 2025, le 1er RIMa ouvre ses portes le samedi 20 septembre, de 16h00 à 18h30, en entrée libre et gratuite.",
        categorie: "événements",
        date: "20 septembre 2025",
        image: "assets/img/portes-ouvertes.jpg"
    },
    {
        titre: "Mission au Antilles",
        contenu: "Une compagnie du 1er RIMa est déployée en appui des forces locales dans la lutte contre le terrorisme.",
        categorie: "opérations",
        date: "22 février 2025",
        image: "assets/img/antilles.jpg"
    },
    {
        titre: "Cérémonie",
        contenu: "Cérémonie de remise de médailles pour les soldats s’étant distingués lors des dernières opérations.",
        categorie: "vie",
        date: "15 février 2025",
        image: "assets/img/ceremonie.jpg"
    },
    {
        titre: "Nouveaux VBCI",
        contenu: "Le régiment reçoit une nouvelle série de VBCI modernisés, renforçant sa capacité opérationnelle.",
        categorie: "vie",
        date: "10 février 2026",
        image: "assets/img/vbci.jpg"
    }
];

// Variables de page et de nombre d'actualités par page
let currentPage = 1;
const newsPerPage = 6;

// Affichage des actualités avec pagination, filtre et recherche
function afficherNews(filter = 'all', search = '') {
    const grid = document.getElementById('news-grid');
    grid.innerHTML = '';

    let filtered = news.filter(item => {
        const matchesSearch = item.titre.toLowerCase().includes(search.toLowerCase()) ||
            item.contenu.toLowerCase().includes(search.toLowerCase());
        const matchesFilter = filter === 'all' || item.categorie === filter;
        return matchesSearch && matchesFilter;
    });

    // Pagination des actualités après filtrage et recherche
    const start = (currentPage - 1) * newsPerPage;
    const end = start + newsPerPage;
    const paginated = filtered.slice(start, end);
    // Affichage des actualités paginées
    paginated.forEach(item => {
        const card = document.createElement('div');
        card.className = 'news-card';
        card.innerHTML = `
            <img src="${item.image || 'assets/img/default-news.jpg'}" alt="${item.titre}">
            <div class="news-card-content">
                <span class="categorie ${item.categorie}">${item.categorie}</span>
                <h3>${item.titre}</h3>
                <p>${item.contenu}</p>
                <div class="date">
                    <span>${item.date}</span>
                    <button class="delete-btn" data-titre="${item.titre}"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });

    // Ajout des événements de suppression 
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const titre = this.getAttribute('data-titre');
            news = news.filter(n => n.titre !== titre);
            afficherNews(document.getElementById('news-filter').value, document.getElementById('news-search').value);
        });
    });

    // Mise à jour de la page
    afficherPagination(filtered.length);
}

// Affichage de la page 
function afficherPagination(total) {
    const pagination = document.getElementById('pagination');
    pagination.innerHTML = '';
    const pages = Math.ceil(total / newsPerPage);
    // Création des boutons de pagination
    for (let i = 1; i <= pages; i++) {
        const button = document.createElement('button');
        button.textContent = i;
        if (i === currentPage) button.classList.add('active');
        button.addEventListener('click', () => {
            currentPage = i;
            afficherNews(document.getElementById('news-filter').value, document.getElementById('news-search').value);
        });
        pagination.appendChild(button);
    }
}

// Ajout d'une actualité avec date automatique
document.getElementById('add-news').addEventListener('submit', function (e) {
    e.preventDefault();
    const titre = document.getElementById('titre').value;
    const categorie = document.getElementById('categorie').value;
    const contenu = document.getElementById('contenu').value;
    const image = document.getElementById('image').value;
    // Génération de la date actuelle au format français
    const date = new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    // Ajout de la nouvelle actualité en début de liste
    news.unshift({ titre, categorie, contenu, date, image });
    currentPage = 1;
    afficherNews(document.getElementById('news-filter').value, document.getElementById('news-search').value);
    this.reset();
});

// Filtre par catégorie
document.getElementById('news-filter').addEventListener('change', function () {
    currentPage = 1;
    afficherNews(this.value, document.getElementById('news-search').value);
});

// Recherche en temps réel
document.getElementById('news-search').addEventListener('input', function () {
    currentPage = 1;
    afficherNews(document.getElementById('news-filter').value, this.value);
});

// Affichage initial des actualités   
afficherNews();
