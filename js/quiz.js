const agariPhaseIcons = {
    1: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="24" fill="%23fff7f9"/><path d="M82 122c-20 0-34-15-34-33 0-19 15-34 34-34 6-14 19-22 34-22 20 0 36 16 36 36 0 14-8 26-20 32-4 13-18 21-33 21-6 0-12-1-17-4z" fill="%23FF456B" opacity="0.12"/><path d="M81 120c0-22 6-41 18-60" stroke="%23FF456B" stroke-width="5" stroke-linecap="round"/><path d="M100 60c-18 4-30 17-34 34 18-4 30-17 34-34z" fill="%23FF456B"/></svg>',
    2: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="24" fill="%23fff7f9"/><path d="M46 92c12-22 31-33 58-34" stroke="%23ff8aa1" stroke-width="8" stroke-linecap="round"/><path d="M94 48l20 10-18 13" fill="none" stroke="%23FF456B" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    3: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="24" fill="%23fff7f9"/><path d="M48 100h64" stroke="%23ffb3c1" stroke-width="8" stroke-linecap="round"/><path d="M48 80h42" stroke="%23FF456B" stroke-width="8" stroke-linecap="round"/><path d="M48 60h28" stroke="%23ff8aa1" stroke-width="8" stroke-linecap="round"/></svg>',
    4: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="24" fill="%23fff7f9"/><rect x="40" y="48" width="80" height="52" rx="14" fill="rgba(255,69,107,0.08)" stroke="%23FF456B" stroke-width="4"/><path d="M64 110l16 10 18-20" fill="none" stroke="%23ffb3c1" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    5: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160" viewBox="0 0 160 160"><rect width="160" height="160" rx="24" fill="%23fff7f9"/><path d="M80 42l10 22 24 3-18 16 5 24-21-12-21 12 5-24-18-16 24-3z" fill="%23FF456B" opacity="0.88"/></svg>'
  };
  const agariPhaseData = {
    1: { branded: 'Latent', summary: 'Your organization is still at the beginning of the journey.', explanation: 'AI interest exists, but the operating conditions to scale it responsibly are not yet in place.', categoryText: 'The next step is usually a foundation-first move that brings clarity before bigger implementation efforts.', productHtml: 'This often leads to a governance foundation such as Halo.', solutionsLabel: 'Related Solutions' },
    2: { branded: 'Emerging', summary: 'You have moved beyond pure exploration, but adoption is still fragmented.', explanation: 'Momentum exists, yet the organization does not fully control how AI is being introduced or scaled.', categoryText: 'The next step is usually an enterprise AI foundation with guardrails, orchestration, and governance.', productHtml: 'Some teams also begin with AGARI to formalize the roadmap first.', solutionsLabel: 'Related Solutions' },
    3: { branded: 'Developing', summary: 'You have meaningful AI activity, but opportunities are still evaluated inconsistently.', explanation: 'There is momentum, but not enough consistency in how use cases are submitted, scored, and prioritized.', categoryText: 'The next step is usually a decision-intelligence layer that standardizes how initiatives move forward.', productHtml: 'This is often complemented by a governance layer such as Halo.', solutionsLabel: 'Related Solutions' },
    4: { branded: 'Realizing', summary: 'You have enough structure to turn AI into real workflows.', explanation: 'The challenge now is less about readiness and more about applying AI in ways that create visible value safely.', categoryText: 'The next step is usually an intelligence platform that lets teams interact with company knowledge securely.', productHtml: 'In parallel, some organizations also benefit from a decision layer such as Helix.', solutionsLabel: 'Related Solutions' },
    5: { branded: 'Leading', summary: 'You are operating beyond isolated pilots.', explanation: 'The opportunity now is to connect mature governance, decision-making, and intelligence into one coherent AI operating model.', categoryText: 'The next step is usually a connected operating model that combines governance, decisioning, and intelligence.', productHtml: 'This can be represented by a combination such as Halo, Helix, and Merlin.', solutionsLabel: 'Related Solutions' }
  };
  const agariStepHints = { 1: 'Start with your current governance baseline.', 2: 'Now look at how AI demand enters the business.', 3: 'Check whether business teams can safely access internal knowledge.', 4: 'Documentation is a strong signal of auditability and maturity.', 5: 'This reveals how early cross-functional thinking happens.', 6: 'End with what happens after deployment.' };
  const agariTotalSteps = 6;
  let agariCurrentStep = 1;
  let agariLastScores = [1, 1, 1, 1, 1, 1];
  const agariPanels = Array.from(document.querySelectorAll('.agari-panel'));
  const agariCurrentStepEl = document.getElementById('agariCurrentStep');
  const agariProgressBar = document.getElementById('agariProgressBar');
  const agariHint = document.getElementById('agariHint');
  const agariPrevBtn = document.getElementById('agariPrevBtn');
  const agariCalculateBtn = document.getElementById('agariCalculateBtn');
  const agariResults = document.getElementById('agariResults');
  const agariQuizForm = document.getElementById('agariQuizForm');
  function agariById(id) { return document.getElementById(id); }
  function agariGetSelectedValue(name) { const checked = document.querySelector(`#agariQuizForm input[name="${name}"]:checked`); return checked ? Number(checked.value) : null; }
  function agariDominantPhase(values) { const avg = values.reduce((a, b) => a + b, 0) / values.length; if (avg < 1.5) return 1; if (avg < 2.5) return 2; if (avg < 3.5) return 3; if (avg < 4.5) return 4; return 5; }
  function agariUpdateStepUI() { agariPanels.forEach((panel, index) => panel.classList.toggle('active', index + 1 === agariCurrentStep)); agariCurrentStepEl.textContent = String(agariCurrentStep); agariProgressBar.style.width = `${(agariCurrentStep / agariTotalSteps) * 100}%`; agariHint.textContent = agariStepHints[agariCurrentStep] || ''; agariPrevBtn.style.visibility = agariCurrentStep === 1 ? 'hidden' : 'visible'; agariById('agariResetBtn').style.visibility = agariCurrentStep === 1 ? 'hidden' : 'visible'; agariCalculateBtn.style.display = agariCurrentStep === agariTotalSteps ? 'inline-flex' : 'none'; }
  function agariValidateCurrentStep() { const value = agariGetSelectedValue(`q${agariCurrentStep}`); if (value === null) { alert('Please choose one option before continuing.'); return false; } return true; }
  function agariRadarPoint(axisIndex, value) { const center = 180; const outer = 132; const angle = (-90 + axisIndex * 60) * (Math.PI / 180); const radius = (value / 5) * outer; return { x: center + Math.cos(angle) * radius, y: center + Math.sin(angle) * radius }; }
  function agariPolygonPoints(values) { return values.map((value, index) => { const p = agariRadarPoint(index, value); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(' '); }
  function agariRenderRadar(values, level) { const baseline = [2.8,2.8,2.8,2.8,2.8,2.8]; agariById('agariBaselinePolygon').setAttribute('points', agariPolygonPoints(baseline)); agariById('agariResultPolygon').setAttribute('points', agariPolygonPoints(values)); agariById('agariPhaseScore').textContent = `${(values.reduce((a,b)=>a+b,0)/values.length).toFixed(1)}/5`; agariById('agariResultPoints').innerHTML = values.map((value, index) => { const p = agariRadarPoint(index, value); return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4.5"></circle>`; }).join(''); ['agariLabelTop','agariLabelRight','agariLabelBottomRight','agariLabelBottom','agariLabelBottomLeft','agariLabelLeft'].forEach(id => agariById(id).classList.remove('active')); const activeMap = {1:'agariLabelTop',2:'agariLabelLeft',3:'agariLabelRight',4:'agariLabelBottomRight',5:'agariLabelBottom'}; if (activeMap[level]) agariById(activeMap[level]).classList.add('active'); }
  function agariRenderResult(level) { const data = agariPhaseData[level]; agariById('agariPhaseTitle').textContent = data.branded; agariById('agariPhaseIcon').src = agariPhaseIcons[level]; agariById('agariPhaseSummary').textContent = data.summary; agariById('agariPhaseExplanation').textContent = data.explanation; agariById('agariSolutionCategory').textContent = data.categoryText; agariById('agariSoftProductLink').textContent = data.productHtml; agariById('agariSolutionsBtn').textContent = data.solutionsLabel; agariRenderRadar(agariLastScores, level); agariQuizForm.style.display = 'none'; agariResults.classList.add('show'); agariResults.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  agariPrevBtn.addEventListener('click', () => { if (agariCurrentStep > 1) { agariCurrentStep -= 1; agariUpdateStepUI(); } });
  agariCalculateBtn.addEventListener('click', () => { if (!agariValidateCurrentStep()) return; agariLastScores = ['q1','q2','q3','q4','q5','q6'].map(agariGetSelectedValue); agariRenderResult(agariDominantPhase(agariLastScores)); });
  // Company name step
  const agariCompanyStep = document.getElementById('agariCompanyStep');
  const agariQuizWrapper = document.getElementById('agariQuizWrapper');
  const agariCompanyNextBtn = document.getElementById('agariCompanyNextBtn');
  agariCompanyNextBtn.addEventListener('click', () => {
    agariCompanyStep.style.display = 'none';
    agariQuizWrapper.style.display = '';
  });

  agariById('agariResetBtn').addEventListener('click', () => { setTimeout(() => { agariCurrentStep = 1; agariQuizForm.style.display = ''; agariResults.classList.remove('show'); document.querySelectorAll('.agari-option').forEach(el => el.classList.remove('selected')); agariUpdateStepUI(); }, 0); });
  agariById('agariRestartBtn').addEventListener('click', () => {
    agariCurrentStep = 1;
    agariQuizForm.style.display = '';
    agariResults.classList.remove('show');
    document.querySelectorAll('.agari-option').forEach(el => el.classList.remove('selected'));
    document.querySelectorAll('#agariQuizForm input[type="radio"]').forEach(input => { input.checked = false; });
    agariUpdateStepUI();
    // Return to company name step
    agariCompanyStep.style.display = '';
    agariQuizWrapper.style.display = 'none';
    document.getElementById('agariCompanyName').value = '';
  });
  document.querySelectorAll('.agari-option input').forEach(input => { input.addEventListener('change', () => { document.querySelectorAll(`#agariQuizForm input[name="${input.name}"]`).forEach(peer => peer.closest('.agari-option').classList.remove('selected')); input.closest('.agari-option').classList.add('selected'); if (agariCurrentStep < agariTotalSteps) { setTimeout(() => { agariCurrentStep += 1; agariUpdateStepUI(); }, 180); } else { setTimeout(() => { const values = ['q1','q2','q3','q4','q5','q6'].map(agariGetSelectedValue); if (values.every(v => v !== null)) { agariLastScores = values; agariRenderResult(agariDominantPhase(values)); } }, 180); } }); });
  agariUpdateStepUI();