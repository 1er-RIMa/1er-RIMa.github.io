// Initialisation de la carte Leaflet
const map = L.map('map').setView([45.65, 0.15], 15);

// Ajout de la couche OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marqueurs et zones
const zones = [
    {
        name: "Casernement",
        coords: [45.651, 0.151],
        color: "#4CAF50",
        description: "Bâtiments principaux du régiment, hébergement des soldats."
    },
    {
        name: "Zone d'entraînement",
        coords: [45.648, 0.153],
        color: "#2196F3",
        description: "Terrain dédié aux exercices tactiques et au tir."
    },
    {
        name: "Garage véhicules",
        coords: [45.649, 0.149],
        color: "#FF9800",
        description: "Hangar de stockage et maintenance des véhicules blindés."
    },
    {
        name: "PC commandement",
        coords: [45.650, 0.152],
        color: "#F44336",
        description: "Poste de commandement et centre de décision."
    }
];

// Ajout des marqueurs et des popups pour chaque zone
zones.forEach(zone => {
    const marker = L.circleMarker(zone.coords, {
        radius: 10,
        fillColor: zone.color,
        color: "#000",
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    }).addTo(map);

    marker.bindPopup(`
        <h3>${zone.name}</h3>
        <p>${zone.description}</p>
    `);
});

// Changement de vue
document.getElementById('toggle-view').addEventListener('click', function () {
    const current = map.getContainer().style.filter;
    // sert a basculer entre le mode jour et le mode nuit de la carte
    if (current) {
        map.getContainer().style.filter = '';
        this.textContent = 'Mode nuit';
    } else {
        map.getContainer().style.filter = 'invert(1) hue-rotate(180deg)';
        this.textContent = 'Mode jour';
    }
});
