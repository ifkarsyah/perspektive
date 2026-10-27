# Goethe-Zertifikat A2 vocabulary, grouped by situation

Source: Goethe-Institut, *Goethe-Zertifikat A2 Wortliste* (version A2_Wortliste_04_050526, © 2016).

Every headword from the alphabetical list and the word-group pages is assigned to exactly one situation.
Total: 1357 entries (1159 main, 198 group).

## Files

| File | Situation | Entries |
|---|---|---|
| `00_all_words.csv` | Everything in one file | 1357 |
| `01_greetings_courtesy.csv` | Greetings, thanks, wishes, polite phrases | 27 |
| `02_personal_info_forms_authorities.csv` | Filling in forms, ID, registration, nationality | 48 |
| `03_family_people.csv` | Family members and people around you | 42 |
| `04_home_housing.csv` | Apartment, rooms, furniture, renting, moving | 64 |
| `05_daily_routine.csv` | Getting up, dressing, washing, sleeping | 13 |
| `06_food_drink_restaurant.csv` | Groceries, meals, drinks, eating out | 87 |
| `07_shopping_money_bank.csv` | Shops, clothes, prices, paying, banking | 72 |
| `08_transport_station_airport.csv` | Train, bus, tram, car, plane, tickets | 51 |
| `09_travel_hotel_sightseeing.csv` | Holidays, hotel, luggage, sights | 35 |
| `10_work_job.csv` | Jobs, workplace, colleagues, office | 50 |
| `11_school_learning_exam.csv` | Classes, studying, exam instructions | 86 |
| `12_body_health_doctor.csv` | Body parts, illness, doctor | 41 |
| `13_communication_phone_post_media.csv` | Phone, post, email, internet, conversation | 67 |
| `14_leisure_social.csv` | Hobbies, sport, going out, celebrations | 90 |
| `15_weather_nature_seasons.csv` | Weather, plants, animals, seasons | 47 |
| `16_places_directions.csv` | City places, location words, directions | 62 |
| `17_public_signs_safety.csv` | Signs and notices, warnings, opening hours | 16 |
| `18_time_dates_calendar.csv` | Clock, days, months, time expressions | 96 |
| `19_numbers_measures_money.csv` | Numbers, ordinals, units, currency | 40 |
| `20_adjectives_colors.csv` | Describing people and things, colors | 113 |
| `21_feelings_opinions.csv` | Emotions, opinions, agreeing and disagreeing | 47 |
| `22_common_verbs.csv` | General-purpose verbs and nouns used everywhere | 71 |
| `23_grammar_pronouns_articles.csv` | Pronouns, articles, possessives | 14 |
| `24_grammar_question_words.csv` | W-questions | 10 |
| `25_grammar_modal_verbs.csv` | Modal verbs | 7 |
| `26_grammar_connectors_particles.csv` | Conjunctions, particles, small prepositions | 61 |

## Columns

- `german`: headword as in the source (verbs in infinitive, `(sich)` marks optional reflexive)
- `article`: der / die / das for nouns
- `plural`: full plural form; `(pl.)` means plural-only noun; blank means none given or not used
- `english`: short English gloss (added, not in the source)
- `part_of_speech`: noun, verb, adj, adv, prep, conj, pron, det, modal, num, phrase, interj, particle, prefix, abbr
- `entry_type`: `main` (alphabetical list), `derived` (indented sub-entry), `group` (word-group pages: professions, numbers, days, colors...)
- `notes`: key phrase, separable verb flag, feminine form, or a second meaning
- `context`: same as the file name, so the combined file can be filtered

## Things to know

- Plurals were normalized to full forms from the source's markers (`¨-e` → Ä/Ö/Ü + e).
- The A2 list does not repeat basics it assumes from A1 (personal pronouns, most numbers); use the A1 pack for those.
- Weekdays appear in the source mainly as adverbs (montags, am Montag); the noun and the adverb are both in `notes`.
- Feminine forms are expected but usually not listed separately; they are in `notes` where the source gives them.
- The source's example sentences are not reproduced. Words with several uses (Karte, Bank, Platz) sit where they are most typical; the gloss lists the other meanings.
- Encoding is UTF-8. Anki and Google Sheets import it directly; in Excel use Data → From Text/CSV and pick UTF-8.
