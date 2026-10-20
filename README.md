# CS 340 Midterm 2 Study

A static study site for BYU CS 340 Midterm 2: 575 practice questions across 23 topics (true/false, multiple choice, short answer, TypeScript code, UML drawing), study notes per topic, an exam simulation, and a review-my-misses queue. Progress is saved in your browser's localStorage. Use Export/Import on the Progress page to move it between devices.

No build step: plain HTML, CSS and JavaScript.

## Run locally

Open `index.html` in a browser, or serve the folder:

```
npx serve .
# or
python -m http.server 8000
```

## Publish on GitHub Pages

1. Create a new **public** repo on GitHub named `cs340-midterm2-study` (no README, so it starts empty).
2. From this folder:

   ```
   git init
   git add .
   git commit -m "CS 340 Midterm 2 study app"
   git branch -M main
   git remote add origin https://github.com/audreyburrell/cs340-midterm2-study.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`, then **Save**.
4. After a minute the site is live at `https://audreyburrell.github.io/cs340-midterm2-study/`.

To update it later: edit, then `git add . && git commit -m "..." && git push`.

## Editing questions

Questions live in `js/data/*.js`, one `BANK.topic({...})` per topic. The field reference is at the top of `js/bank.js`.

- `t`: `'tf'`, `'mc'`, `'sa'` (short answer), `'code'`, `'draw'`
- `q`: prompt (wrap inline code in backticks); `c`: optional code block
- TF: `a: true|false`. MC: `o: [...]`, `a: <index of correct option>`
- Written: `k: [key points]`, `m: model answer text`, `mc: model code`, `svg: model diagram`
- `e`: explanation shown after answering

Question IDs are `topic-id-N` by position, so add new questions at the **end** of a topic's list to keep saved progress lined up.

## Files

```
index.html          page shell
css/style.css       styles (light + dark)
js/bank.js          question registry
js/data/*.js        topics, study notes, questions
js/app.js           routing, practice, exam, review, progress
```

Course slides and readings are not included in this repo.
