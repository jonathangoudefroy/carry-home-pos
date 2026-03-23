# Carry Home POS — Claude Code Prompt

Lies zuerst AGENT.md im Root und halte dich an die dort definierten Regeln.

## Projekt

Carry Home POS — ein Point-of-Sale-System für einen Kunstmarkt plus ein Künstler:innen-Onboarding-Formular.

**Kontext:** Carry (We Carry Art) veranstaltet am 25. April einen Affordable Art Market namens "Carry Home – Spring Edition" im LAP Bergmannstraße in Berlin. Am Verkaufstisch steht eine Person mit dem iPad und wickelt Verkäufe ab. Das Besondere: Das Geld fließt direkt an die Künstler:innen — Carry nimmt kein Geld entgegen, sondern zeigt den Käufer:innen den passenden Zahlungsweg (QR-Code für Banküberweisung, PayPal-Link oder Bargeld). Carry berechnet den Künstler:innen im Nachgang 30 % Provision.

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Deployment via Vercel (GitHub-Repo verbunden)
- Daten werden lokal im Browser gespeichert (localStorage) — keine Datenbank
- EPC-QR-Code-Generierung clientseitig (`qrcode` npm package — bereits installiert)

## App-Architektur: Zwei Bereiche

### A) POS-System (`/` — Hauptapp, iPad am Tisch)
- Passwortgeschützt mit simplem PIN-Screen (PIN in Einstellungen setzbar, default: `2504`)
- Hier werden Verkäufe abgewickelt

### B) Künstler:innen-Formular (`/submit` — öffentliche Seite)
- Kein Login nötig
- Künstler:innen tragen ihre Daten ein
- Am Ende wird ein Import-Code generiert (base64-encodiertes JSON)
- Copy-to-Clipboard + mailto-Link an hey@wecarryart.com

---

## Screens & Features — POS-System

### 1. PIN-Screen
- Einfaches Nummernfeld, 4-stelliger PIN
- Nach korrekter Eingabe → Startscreen
- PIN wird in localStorage gespeichert

### 2. Künstler:innen-Übersicht (Startscreen)
- Suchfeld oben
- Karten pro Künstler:in: Name, Anzahl verfügbarer Werke, Payment-Tags (QR/SEPA, PayPal, Bar)
- Tap → Artist Detail Screen

### 3. Artist Detail Screen
- Name + verfügbare Werke
- Pro Werk: Titel, Medium/Technik, Preis
- "Verkaufen"-Button pro Werk
- Verkaufte Werke: "VERKAUFT" markiert (ausgegraut, nicht klickbar)

### 4. Payment Modal (Bottom Sheet)
- Öffnet sich beim Tap auf "Verkaufen"
- **Drei Tabs:** QR-Code | PayPal | Bargeld
- **QR-Code Tab:** EPC/GiroCode (SEPA-Standard) mit IBAN, BIC, Name, Betrag, Verwendungszweck. Falls keine IBAN: Hinweis.
- **PayPal Tab:** PayPal.me-Link mit Betrag oder "PayPal an [email]". Falls kein PayPal: Hinweis.
- **Bargeld Tab:** Bestätigung "X € in bar erhalten?"
- **Tab-Default:** Erster verfügbarer Zahlungsweg (IBAN > PayPal > Bar)
- "Verkauf bestätigen"-Button → loggt Sale, markiert Werk als verkauft

### 5. Verkäufe-Screen
- Drei Summary-Karten: Anzahl Verkäufe, Gesamtumsatz, Provision (30 %)
- Chronologische Liste (neueste oben): Werk, Künstler:in, Preis, Zahlungsart, Uhrzeit
- CSV-Export-Button
- Verkauf rückgängig machen (Button)

### 6. Einstellungen-Screen
- Manuelles Hinzufügen von Künstler:innen (Name, IBAN, BIC, PayPal)
- Dynamisches Hinzufügen von Werken (Titel, Preis, Medium)
- Import-Funktion: Textfeld für Import-Code → parst JSON, Duplikat-Check auf Name
- Liste gespeicherter Künstler:innen mit Edit/Löschen
- PIN ändern
- "Demo-Daten laden" Button
- "Alle Daten zurücksetzen" (mit Bestätigungsdialog)

---

## Screens & Features — Künstler:innen-Formular (`/submit`)

Öffentliche Seite, mobile-first, kein Login. Freundliches Design.

**Intro-Text:**
> **Carry Home – Spring Edition**
> 25. April · LAP Bergmannstraße, Berlin
>
> Schön, dass du dabei bist! Bitte trag hier deine Daten ein, damit wir am Tag des Events alles für den Verkauf deiner Werke vorbereitet haben. Deine Daten werden nicht online gespeichert — am Ende bekommst du einen Code, den du uns per Mail schickst.

**Felder:**
- Name (Pflicht)
- E-Mail (Pflicht)
- IBAN (optional — "Für Zahlung per Banküberweisung/QR-Code")
- BIC (optional — "Findest du auf deiner Bankkarte oder im Online-Banking")
- PayPal (optional — "Dein PayPal.me-Link oder PayPal-E-Mail-Adresse")
- Validierung: Mindestens ein Zahlungsweg (IBAN oder PayPal)

**Werke (dynamisch, min. 1):**
- Titel (Pflicht), Preis in € (Pflicht), Technik/Medium (optional)
- "+ Weiteres Werk hinzufügen"

**Ende:**
- Vorschau der Daten
- "Code generieren" → base64-JSON im Textfeld + Copy-Button
- Text: "Schick diesen Code per Mail an hey@wecarryart.com"
- "Per Mail senden"-Button (mailto mit Subject "Carry Home – Daten [Name]")

---

## Demo-Daten

(Werden über "Demo-Daten laden" eingefügt)

**Jonathan Goudefroy**
- PayPal: jonny.g@gmx.net
- IBAN: DE45 1001 1001 2477 8253 98
- BIC: NTSBDEB1XXX
- Werke:
  - "Golden Hour Berlin" — 280 € — Acryl auf Leinwand
  - "Stadtrand" — 150 € — Aquarell auf Papier
  - "Postkarten-Set Kreuzberg (5 Stk)" — 12 € — Digitaldruck

**Michael Nickel**
- PayPal: @touchedbythepiano
- IBAN: (leer)
- BIC: (leer)
- Werke:
  - "Resonanz I" — 340 € — Mixed Media auf Holz
  - "Kleine Studie in Blau" — 90 € — Siebdruck
  - "Art Print — Resonanz" — 25 € — Giclée-Druck

---

## Design-Vorgaben

Inspiriert von **wecarryart.com** (warm, einladend) und **SumUp POS** (clean, effizient, touch-optimiert).

- **Primär-Zielgerät POS:** iPad (landscape + portrait), generell responsive
- **Primär-Zielgerät Formular:** Smartphone
- **Font:** Inter (Google Fonts) — durchgängig für alles
- **Farbpalette:**
  - Background POS: `#FFFFFF` (weiß, clean wie SumUp)
  - Background Formular: `#F7D9F1` (Carry-Rosa, warm und einladend)
  - Text: `#0F131A` (fast-schwarz)
  - Accent/CTA: `#FE4F40` (Carry Coral-Rot)
  - Success: `#3a7d5c` (grün)
  - Subtle/Borders: `#E1E7EF` (helles Grau)
  - Surface/Cards: `#F8F9FA` (sehr helles Grau)
- **Buttons:** `border-radius: 12px`, große Touch-Targets (min. 44px)
- **Cards:** `border-radius: 12px`, subtle shadow oder border
- **POS:** Bottom Navigation mit 3 Tabs: Künstler:innen | Verkäufe | Einstellungen
- **QR-Codes:** Min. 250px auf iPad
- **Formular (`/submit`):** Kein Navigation-Bar, eigenständiges Layout
- **Logo:** Falls vorhanden im `/public`-Ordner, einbinden

---

## EPC-QR-Code Format

SEPA-Überweisung nach EPC069-12 Standard:

```
BCD
002
1
SCT
[BIC]
[Empfänger-Name]
[IBAN ohne Leerzeichen]
EUR[Betrag]


Carry Home - [Werk-Titel]


```

Error Correction Level: **M** (EPC-Standard).

---

## Import-Code Format

base64-encodiertes JSON:

```json
{
  "v": 1,
  "name": "Alexandra Koval",
  "email": "alex@example.com",
  "iban": "DE89370400440532013000",
  "bic": "COBADEFFXXX",
  "paypal": "paypal.me/alexkoval",
  "works": [
    { "title": "Frühlingslicht", "price": 280, "medium": "Acryl auf Leinwand" },
    { "title": "Postkarten-Set", "price": 12, "medium": "Digitaldruck" }
  ]
}
```

---

## Nicht im Scope

- Keine Datenbank / kein Backend
- Keine User-Authentifizierung (außer PIN)
- Keine Echtzeit-Sync
- Keine Bildupload-Funktion
- Keine automatische Rechnungsstellung
