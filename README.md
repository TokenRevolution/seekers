# Seekers - Landing Page Caccia al Tesoro a Coppie

Una landing page moderna e interattiva per permettere alle coppie di candidarsi a una caccia al tesoro urbana.

## 🎯 Caratteristiche

### Design Moderno
- **Design responsive** che si adatta a tutti i dispositivi
- **Animazioni fluide** con scroll-based animations
- **Gradients e effetti visivi** per un'esperienza coinvolgente
- **Font moderni** (Poppins) e icone FontAwesome

### Sezioni Principali
1. **Hero Section**: Presentazione principale con statistiche animate
2. **About Section**: Informazioni sull'evento e come funziona
3. **Registration Form**: Form completo per registrare le coppie
4. **Footer**: Contatti e link utili

### Funzionalità Interattive
- **Navigazione smooth scroll** tra le sezioni
- **Form validation in tempo reale** con messaggi di errore
- **Animazioni al caricamento** degli elementi
- **Effetti hover** su bottoni e elementi interattivi
- **Modal di conferma** dopo l'invio del form
- **Easter egg** con Konami Code (↑↑↓↓←→←→BA)

## 🚀 Come Utilizzare

### Apertura della Pagina
1. Apri il file `index.html` in un browser web moderno
2. La pagina funziona completamente offline (nessun server richiesto)

### Navigazione
- Usa il menu di navigazione in alto per spostarti tra le sezioni
- Il pulsante "Candidati Ora" ti porta direttamente al form di registrazione

### Compilazione del Form
Il form raccoglie informazioni per entrambi i partecipanti:
- **Dati personali**: Nome, cognome, email, telefono, età
- **Informazioni aggiuntive**: Nome del team, livello di esperienza, motivazione
- **Consensi**: Termini e condizioni, newsletter

### Validazione
Il form include validazione automatica per:
- Campi obbligatori
- Format email valido
- Numeri di telefono (con formattazione automatica)
- Età minima (16 anni)
- Email diverse per i due partecipanti
- Accettazione termini e condizioni

## 📁 Struttura File

```
seekers/
├── index.html          # Pagina principale
├── style.css           # Stili e design
├── script.js           # Logica JavaScript
└── README.md           # Documentazione
```

## 🎨 Personalizzazione

### Colori
I colori principali sono definiti come variabili CSS in `style.css`:
```css
:root {
    --primary-color: #2c3e50;    /* Blu scuro */
    --secondary-color: #e74c3c;  /* Rosso */
    --accent-color: #f39c12;     /* Arancione */
    --gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
```

### Contenuti
Modifica `index.html` per personalizzare:
- Nome dell'evento e organizzazione
- Dettagli dell'evento (data, orario, luogo)
- Statistiche nella hero section
- Informazioni di contatto nel footer

### Stili
Modifica `style.css` per:
- Cambiare colori e font
- Adattare il layout
- Aggiungere nuove animazioni

## 📱 Compatibilità

La landing page è ottimizzata per:
- **Desktop**: Chrome, Firefox, Safari, Edge
- **Mobile**: iOS Safari, Android Chrome
- **Tablet**: Tutti i browser moderni

## 🔧 Funzionalità Tecniche

### Animazioni
- **Intersection Observer** per animazioni scroll-based
- **CSS Transitions** per effetti hover
- **Keyframe animations** per effetti speciali

### Form Handling
- **Validazione client-side** in tempo reale
- **Formatting automatico** numeri di telefono
- **Messaggi di errore** personalizzati
- **Modal di successo** animato

### Performance
- **CSS e JS ottimizzati** per caricamento veloce
- **Lazy loading** per animazioni
- **Debouncing** per eventi di input

## 🎮 Easter Egg

Prova a digitare il **Konami Code** mentre sei sulla pagina:
`↑ ↑ ↓ ↓ ← → ← → B A`

## 📄 Licenza

Questo progetto è creato per uso personale. Sentiti libero di modificarlo e adattarlo alle tue esigenze.

## 🤝 Supporto

Per domande o suggerimenti sulla landing page, puoi:
- Modificare direttamente i file secondo le tue necessità
- Consultare la documentazione nei commenti del codice
- Testare le funzionalità in diversi browser

---

**Buona fortuna con la vostra caccia al tesoro!** 🗺️💎 