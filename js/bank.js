/*
 * Question bank registry.
 *
 * Question shapes (field names kept short so the data files stay readable):
 *   t:  'tf' | 'mc' | 'sa' | 'code' | 'draw'
 *   q:  prompt text
 *   c:  optional code shown with the prompt (TypeScript)
 *   tf:   a: true | false
 *   mc:   o: [options], a: index of correct option, fixed: true to keep option order
 *   sa / code / draw (self-graded):
 *         k:  key points the answer should hit (checklist)
 *         m:  model answer (plain text)
 *         mc: model answer code (shown as a code block)
 *         svg: model answer drawing (SVG markup)
 *   e:  explanation shown after answering
 *   src: optional short source note
 */
window.BANK = {
  groups: [
    { id: 'reuse', title: 'Code reuse & patterns' },
    { id: 'principles', title: 'Design principles' },
    { id: 'testing', title: 'Testing' },
    { id: 'aws', title: 'AWS & the web' },
  ],
  topics: [],
  byId: {},
  topic(def) {
    def.questions.forEach((q, i) => {
      q.id = def.id + '-' + (i + 1);
      q.topic = def.id;
    });
    this.topics.push(def);
    this.byId[def.id] = def;
  },
  allQuestions() {
    return this.topics.flatMap((t) => t.questions);
  },
};
