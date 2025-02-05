# Vefforritun 2 2025, verkefni 1
vef2v1 Repository Máni Eiðsson verkefni 1

copy af verkefnis lýsingu

PS E:\vef2\vef2-2025-v1> npm run build


> vef2-2025-v1@1.0.0 build
> node src/main.js

[LOG] Starting application
[ERROR] Some invalid categories were skipped
[LOG] Creating index.html
[LOG] index.html created
[LOG] Creating page for: HTML
[LOG] ./dist/html.html created
[LOG] Creating page for: CSS
[LOG] ./dist/css.html created
[LOG] Creating page for: JavaScript
[LOG] ./dist/js.html created
[LOG] Creating page for: Ógild skrá
[ERROR] Error reading data for invalid.json: Error reading file ./data/invalid.json: ENOENT: no such file or directory, open 'E:\vef2\vef2-2025-v1\data\invalid.json'
[LOG] Creating page for: Ógild gögn, ætti ég að birtast?
[ERROR] Error in data for corrupt.json: Invalid category data
[LOG] Application executed successfully
PS E:\vef2\vef2-2025-v1> npm test

> vef2-2025-v1@1.0.0 test
> vitest --coverage


 DEV  v3.0.5 E:/vef2/vef2-2025-v1
      Coverage enabled with v8

 ✓ src/tests/helpers.test.js (5 tests) 3ms
   ✓ readJson Function > les rétt JSON skrá
   ✓ readJson Function > error - skrá ekki til
   ✓ createIndexContent Function > býr til rétt HTML fyrir categories
   ✓ createCategoryContent Function > býr til rétt HTML fyrir spurningar
   ✓ createCategoryContent Function > error check - category data

 Test Files  1 passed (1)
      Tests  5 passed (5)
   Start at  22:52:38
   Duration  268ms (transform 24ms, setup 0ms, collect 30ms, tests 3ms, environment 0ms, prepare 65ms)

 % Coverage report from v8
-------------|---------|----------|---------|---------|-------------------
File         | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
-------------|---------|----------|---------|---------|-------------------
All files    |   56.65 |       90 |      75 |   56.65 |                  
 src         |       0 |        0 |       0 |       0 |                  
  main.js    |       0 |        0 |       0 |       0 | 1-101            
 src/lib     |     100 |      100 |     100 |     100 |                  
  helpers.js |     100 |      100 |     100 |     100 |                  
-------------|---------|----------|---------|---------|-------------------

vef2v1 Repository
Máni Eiðsson verkefni 1

copy af verkefnis lýsingu
## Markmið

- Upprifjun og notkun á verkfærum og tólum úr vefforritun 1.
- Ósamstillt forritun með Node.js og notkun á módúlum.
- Útbúa test og setja upp keyrslu á testum með GitHub Actions.
- Vinnsla með gagnastrúktúra og staðfestingu á gögnum.

## Verkefnið

Gefin eru gögn fyrir krossaspurningar um HTML, CSS og JavaScript ásamt skrá sem vísar í þær. Skrifa skal forrit sem les þessar skrár, útbýr HTML í build skrefi fyrir spurningarnar og tengir við framenda útfærslu.

Skrifa skal allan kóða, ekki skal nota forritasöfn frá t.d. NPM.
