# Goethe-Zertifikat A1 (Start Deutsch 1) vocabulary, grouped by situation

Source: Goethe-Institut, *Goethe-Zertifikat A1: Start Deutsch 1 Wortliste* (version VS_02, March 2012).

Every headword from the alphabetical list and the 13 word groups is assigned to exactly one situation.
Total: 794 entries (633 main, 52 derived sub-entries, 109 from the word groups).

## Files

| File | Situation | Entries |
|---|---|---|
| `00_all_words.csv` | Everything in one file | 794 |
| `01_greetings_courtesy.csv` | Greetings, thanks, wishes, polite phrases | 26 |
| `02_personal_info_forms_authorities.csv` | Filling in forms, ID, registration, nationality | 40 |
| `03_family_people.csv` | Family members and people around you | 36 |
| `04_home_housing.csv` | Apartment, rooms, furniture, renting, moving | 36 |
| `05_daily_routine.csv` | Getting up, dressing, washing, sleeping | 8 |
| `06_food_drink_restaurant.csv` | Groceries, meals, drinks, eating out | 51 |
| `07_shopping_money_bank.csv` | Shops, clothes, prices, paying, banking | 30 |
| `08_transport_station_airport.csv` | Train, bus, tram, car, plane, tickets | 35 |
| `09_travel_hotel_sightseeing.csv` | Holidays, hotel, luggage, sights | 21 |
| `10_work_job.csv` | Jobs, workplace, colleagues, office | 18 |
| `11_school_learning_exam.csv` | Classes, studying, exam instructions | 42 |
| `12_body_health_doctor.csv` | Body parts, illness, doctor | 15 |
| `13_communication_phone_post_media.csv` | Phone, post, email, internet, conversation | 32 |
| `14_leisure_social.csv` | Hobbies, sport, going out, celebrations | 36 |
| `15_weather_nature_seasons.csv` | Weather, plants, animals, seasons | 16 |
| `16_places_directions.csv` | City places, location words, directions | 38 |
| `17_public_signs_safety.csv` | Signs and notices, warnings, opening hours | 14 |
| `18_time_dates_calendar.csv` | Clock, days, months, time expressions | 72 |
| `19_numbers_measures_money.csv` | Numbers, ordinals, units, currency | 55 |
| `20_adjectives_colors.csv` | Describing people and things, colors | 52 |
| `21_common_verbs.csv` | General-purpose verbs used everywhere | 45 |
| `22_grammar_pronouns_articles.csv` | Pronouns, articles, possessives | 25 |
| `23_grammar_question_words.csv` | W-questions | 11 |
| `24_grammar_modal_verbs.csv` | Modal verbs | 7 |
| `25_grammar_connectors_particles.csv` | Conjunctions, particles, small prepositions | 33 |

## Columns

- `german`: headword as in the source (verbs in infinitive, `(sich)` marks optional reflexive)
- `article`: der / die / das for nouns
- `plural`: full plural form; `(pl.)` means plural-only noun; blank means the source gives no plural at A1
- `english`: short English gloss (added, not in the source)
- `part_of_speech`: noun, verb, adj, adv, prep, conj, pron, det, modal, num, phrase, interj, particle, prefix
- `entry_type`: `main` (counted headword), `derived` (indented sub-entry in the source, e.g. danken → der Dank), `group` (from the word-group pages: numbers, days, months, colors...)
- `notes`: key phrase, separable verb flag, feminine form, or a second meaning
- `context`: same as the file name, so the combined file can be filtered

## Things to know

- Plurals were normalized to full forms. The source notation is inconsistent and has at least one error (`die Woche, -e` is really `Wochen`).
- Feminine forms (Lehrerin, Kundin...) are expected at A1 but not listed separately; they are in `notes` where the source hints at them.
- The source's example sentences are not reproduced. Words with several situations (Karte, Bank, Platz) sit where they are most typical; the gloss lists the other meanings.
- Encoding is UTF-8. Anki and Google Sheets import it directly; in Excel use Data → From Text/CSV and pick UTF-8.
