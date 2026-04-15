// EVOCS AI Readiness Assessment — PPTX download
// Colors derived from the EVOCS reference presentation
// Primary accent: FF456B | Dark bg: 082836 | Charcoal: 262626 | Cover bg: FAE2D5

(function () {
  // Question labels for the breakdown slide
  var questionLabels = [
    'AI Governance Policy',
    'Use Case Evaluation',
    'Internal Knowledge Access',
    'Risk Documentation',
    'Cross-functional Collaboration',
    'Post-deployment Monitoring'
  ];

  // Answer labels per question (value 1-5 maps to index 0-4)
  var answerLabels = [
    ['No formal policy', 'Some principles exist', 'Draft or partial policy', 'Formal policy enforced', 'Policy in tooling and lifecycle'],
    ['No formal intake', 'Manual and inconsistent', 'Some shared criteria', 'Repeatable evaluation', 'End-to-end decisioning'],
    ['No approved way', 'Only manual research', 'Some pilots exist', 'Yes, with controlled access', 'Yes, at scale'],
    ['No documentation', 'Partial documentation', 'Templates exist', 'Standard process', 'Embedded in workflows'],
    ['Late or not at all', 'After development starts', 'Early but inconsistent', 'From the beginning', 'Before ideas become projects'],
    ['No monitoring', 'Ad hoc monitoring', 'Basic monitoring', 'Systematic monitoring', 'Scalable with response plans']
  ];

  // Product recommendations per maturity level
  var productRecs = {
    1: {
      label: 'Recommended starting point: Alba',
      items: [
        { name: 'Alba', desc: 'AI governance foundation, policy enforcement, and audit trail for organizations building their compliance baseline.' },
        { name: 'EVOCS Assessment', desc: 'A structured engagement to map your current AI posture and define a prioritized roadmap.' }
      ]
    },
    2: {
      label: 'Recommended next step: Alba and Pontix',
      items: [
        { name: 'Alba', desc: 'Establish guardrails, governance, and a compliant AI operating layer across your organization.' },
        { name: 'Pontix', desc: 'Formalize your AI roadmap with a structured intake and scoring system for every use case.' }
      ]
    },
    3: {
      label: 'Recommended focus: Pontix and Alba',
      items: [
        { name: 'Pontix', desc: 'AI-powered intake that converts plain-language ideas into structured, scored opportunities automatically.' },
        { name: 'Alba', desc: 'Governance layer that brings consistency and auditability to your growing AI portfolio.' }
      ]
    },
    4: {
      label: 'Recommended platform: Alba and Lagos',
      items: [
        { name: 'Alba', desc: 'One platform for every AI initiative: governed workspace, reusable modules, and enterprise-grade security.' },
        { name: 'Lagos', desc: 'Private market intelligence, instantly accessible. Query your internal knowledge in plain language.' }
      ]
    },
    5: {
      label: 'Recommended operating model: Alba, Pontix, and Lagos',
      items: [
        { name: 'Alba', desc: 'Governance and compliance at enterprise scale, integrated into every AI lifecycle stage.' },
        { name: 'Pontix', desc: 'Intelligent intake that connects strategy, engineering, and business teams around prioritized AI investments.' },
        { name: 'Lagos', desc: 'Secure, organization-wide AI knowledge access for every business function, instantly.' }
      ]
    }
  };

  function generatePptx(companyName, scores, level, phaseData) {
    var pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 inches

    var CORAL    = 'FF456B';
    var DARK_BG  = '082836';
    var CHARCOAL = '262626';
    var PEACH_BG = 'FAE2D5';
    var WHITE    = 'FFFFFF';
    var GRAY     = '595959';
    var LIGHT_GRAY = 'A5A5A5';
    var MID_DARK = '3F3F3F';

    var avg = (scores.reduce(function(a, b) { return a + b; }, 0) / scores.length).toFixed(1);
    var today = new Date();
    var dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var company = (companyName && companyName.trim()) ? companyName.trim() : 'Your Organization';

    // ── SLIDE 1: Cover ──────────────────────────────────────────────────────
    var s1 = pptx.addSlide();
    // Peach background (full slide)
    s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: PEACH_BG }, line: { color: PEACH_BG } });
    // Dark left panel
    s1.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: 5.8, h: '100%', fill: { color: DARK_BG }, line: { color: DARK_BG } });
    // Coral accent bar
    s1.addShape(pptx.ShapeType.rect, { x: 5.8, y: 0, w: 0.08, h: '100%', fill: { color: CORAL }, line: { color: CORAL } });

    // EVOCS brand on dark panel
    s1.addText('EVOCS', {
      x: 0.5, y: 0.5, w: 5, h: 0.5,
      fontSize: 13, bold: true, color: CORAL,
      fontFace: 'Calibri', charSpacing: 4
    });

    // Main title
    s1.addText('AI Readiness\nAssessment Results', {
      x: 0.5, y: 1.4, w: 5, h: 2.2,
      fontSize: 38, bold: true, color: WHITE,
      fontFace: 'Calibri', lineSpacingMultiple: 1.15
    });

    // Company name
    s1.addText(company, {
      x: 0.5, y: 3.8, w: 5, h: 0.55,
      fontSize: 20, color: PEACH_BG,
      fontFace: 'Calibri', italic: true
    });

    // Date
    s1.addText(dateStr, {
      x: 0.5, y: 4.45, w: 5, h: 0.4,
      fontSize: 13, color: LIGHT_GRAY,
      fontFace: 'Calibri'
    });

    // Right panel: score callout
    s1.addText('Maturity Score', {
      x: 6.3, y: 2.4, w: 6.5, h: 0.45,
      fontSize: 14, color: GRAY, fontFace: 'Calibri', align: 'center'
    });
    s1.addText(avg + ' / 5', {
      x: 6.3, y: 2.85, w: 6.5, h: 1.2,
      fontSize: 64, bold: true, color: CHARCOAL, fontFace: 'Calibri', align: 'center'
    });
    s1.addText(phaseData.branded.toUpperCase(), {
      x: 6.3, y: 4.0, w: 6.5, h: 0.55,
      fontSize: 22, bold: true, color: CORAL, fontFace: 'Calibri', align: 'center', charSpacing: 3
    });

    // Confidential footer
    s1.addText('PRIVATE AND CONFIDENTIAL', {
      x: 0.5, y: 6.9, w: 12.3, h: 0.3,
      fontSize: 9, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'right', charSpacing: 2
    });

    // ── SLIDE 2: Results Summary ─────────────────────────────────────────────
    var s2 = pptx.addSlide();
    s2.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: WHITE }, line: { color: WHITE } });
    // Top coral header band
    s2.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: DARK_BG }, line: { color: DARK_BG } });

    s2.addText('Results Summary', {
      x: 0.5, y: 0.28, w: 9, h: 0.55,
      fontSize: 26, bold: true, color: WHITE, fontFace: 'Calibri'
    });
    s2.addText('EVOCS  |  ' + company, {
      x: 0.5, y: 0.72, w: 12, h: 0.28,
      fontSize: 10, color: LIGHT_GRAY, fontFace: 'Calibri'
    });

    // Score card (left)
    s2.addShape(pptx.ShapeType.rect, { x: 0.5, y: 1.4, w: 3.6, h: 4.2, fill: { color: DARK_BG }, line: { color: DARK_BG }, rounding: true });
    s2.addText('Overall Score', {
      x: 0.5, y: 1.7, w: 3.6, h: 0.4,
      fontSize: 13, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'center'
    });
    s2.addText(avg, {
      x: 0.5, y: 2.15, w: 3.6, h: 1.3,
      fontSize: 72, bold: true, color: WHITE, fontFace: 'Calibri', align: 'center'
    });
    s2.addText('out of 5.0', {
      x: 0.5, y: 3.4, w: 3.6, h: 0.35,
      fontSize: 13, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'center'
    });
    s2.addShape(pptx.ShapeType.rect, { x: 1.1, y: 3.85, w: 2.4, h: 0.05, fill: { color: CORAL }, line: { color: CORAL } });
    s2.addText(phaseData.branded, {
      x: 0.5, y: 4.0, w: 3.6, h: 0.5,
      fontSize: 18, bold: true, color: CORAL, fontFace: 'Calibri', align: 'center'
    });
    s2.addText('Maturity Phase', {
      x: 0.5, y: 4.5, w: 3.6, h: 0.3,
      fontSize: 11, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'center'
    });

    // Summary text (right)
    s2.addText('What this means', {
      x: 4.5, y: 1.4, w: 8.3, h: 0.4,
      fontSize: 16, bold: true, color: CHARCOAL, fontFace: 'Calibri'
    });
    s2.addText(phaseData.summary, {
      x: 4.5, y: 1.9, w: 8.3, h: 0.8,
      fontSize: 14, color: MID_DARK, fontFace: 'Calibri', wrap: true
    });
    s2.addText(phaseData.explanation, {
      x: 4.5, y: 2.75, w: 8.3, h: 0.9,
      fontSize: 13, color: GRAY, fontFace: 'Calibri', wrap: true
    });
    s2.addText('Recommended direction', {
      x: 4.5, y: 3.8, w: 8.3, h: 0.4,
      fontSize: 16, bold: true, color: CHARCOAL, fontFace: 'Calibri'
    });
    s2.addText(phaseData.categoryText, {
      x: 4.5, y: 4.25, w: 8.3, h: 0.9,
      fontSize: 13, color: GRAY, fontFace: 'Calibri', wrap: true
    });

    // Footer
    s2.addText('EVOCS  |  PRIVATE AND CONFIDENTIAL  |  ' + dateStr, {
      x: 0.5, y: 7.1, w: 12.3, h: 0.25,
      fontSize: 9, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'right', charSpacing: 1
    });

    // ── SLIDE 3: Dimension Breakdown ─────────────────────────────────────────
    var s3 = pptx.addSlide();
    s3.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: WHITE }, line: { color: WHITE } });
    s3.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: 1.1, fill: { color: CHARCOAL }, line: { color: CHARCOAL } });

    s3.addText('Dimension Breakdown', {
      x: 0.5, y: 0.28, w: 9, h: 0.55,
      fontSize: 26, bold: true, color: WHITE, fontFace: 'Calibri'
    });
    s3.addText('Score per dimension  |  1 = early stage, 5 = leading', {
      x: 0.5, y: 0.72, w: 12, h: 0.28,
      fontSize: 10, color: LIGHT_GRAY, fontFace: 'Calibri'
    });

    var barMaxW = 9.5;
    var startY = 1.35;
    var rowH = 0.78;

    scores.forEach(function (score, i) {
      var y = startY + i * rowH;
      var answerText = answerLabels[i] && answerLabels[i][score - 1] ? answerLabels[i][score - 1] : '';
      var barW = (score / 5) * barMaxW;
      var scoreColor = score >= 4 ? '028090' : score === 3 ? CORAL : 'FF4C60';

      // Row background (alternating)
      if (i % 2 === 0) {
        s3.addShape(pptx.ShapeType.rect, { x: 0.3, y: y, w: 12.7, h: rowH - 0.06, fill: { color: 'F8F9FA' }, line: { color: 'F8F9FA' } });
      }

      // Label
      s3.addText(questionLabels[i], {
        x: 0.5, y: y + 0.07, w: 2.9, h: 0.32,
        fontSize: 11, bold: true, color: CHARCOAL, fontFace: 'Calibri'
      });
      s3.addText(answerText, {
        x: 0.5, y: y + 0.38, w: 2.9, h: 0.28,
        fontSize: 9, color: GRAY, fontFace: 'Calibri', italic: true
      });

      // Bar background
      s3.addShape(pptx.ShapeType.rect, { x: 3.55, y: y + 0.22, w: barMaxW, h: 0.28, fill: { color: 'EEEEEE' }, line: { color: 'EEEEEE' }, rounding: true });
      // Bar fill
      if (barW > 0.1) {
        s3.addShape(pptx.ShapeType.rect, { x: 3.55, y: y + 0.22, w: barW, h: 0.28, fill: { color: scoreColor }, line: { color: scoreColor }, rounding: true });
      }

      // Score label
      s3.addText(score + ' / 5', {
        x: 13.15, y: y + 0.18, w: 0.65, h: 0.36,
        fontSize: 12, bold: true, color: scoreColor, fontFace: 'Calibri', align: 'right'
      });
    });

    // Footer
    s3.addText('EVOCS  |  PRIVATE AND CONFIDENTIAL  |  ' + dateStr, {
      x: 0.5, y: 7.1, w: 12.3, h: 0.25,
      fontSize: 9, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'right', charSpacing: 1
    });

    // ── SLIDE 4: Next Steps ──────────────────────────────────────────────────
    var s4 = pptx.addSlide();
    s4.addShape(pptx.ShapeType.rect, { x: 0, y: 0, w: '100%', h: '100%', fill: { color: DARK_BG }, line: { color: DARK_BG } });

    s4.addText('Recommended Next Steps', {
      x: 0.6, y: 0.45, w: 12, h: 0.65,
      fontSize: 30, bold: true, color: WHITE, fontFace: 'Calibri'
    });
    s4.addText('Based on your ' + phaseData.branded + ' maturity phase', {
      x: 0.6, y: 1.1, w: 12, h: 0.35,
      fontSize: 13, color: LIGHT_GRAY, fontFace: 'Calibri', italic: true
    });

    var rec = productRecs[level] || productRecs[3];

    s4.addText(rec.label, {
      x: 0.6, y: 1.65, w: 12, h: 0.4,
      fontSize: 14, bold: true, color: CORAL, fontFace: 'Calibri'
    });

    var cardStartX = 0.6;
    var cardW = rec.items.length === 3 ? 4.1 : 6.1;
    var cardGap = rec.items.length === 3 ? 0.15 : 0.2;

    rec.items.forEach(function (item, i) {
      var cx = cardStartX + i * (cardW + cardGap);
      s4.addShape(pptx.ShapeType.rect, { x: cx, y: 2.2, w: cardW, h: 3.5, fill: { color: '0B3547' }, line: { color: '0B3547' }, rounding: true });
      // Coral top accent on card
      s4.addShape(pptx.ShapeType.rect, { x: cx, y: 2.2, w: cardW, h: 0.1, fill: { color: CORAL }, line: { color: CORAL } });
      s4.addText(item.name, {
        x: cx + 0.25, y: 2.45, w: cardW - 0.5, h: 0.5,
        fontSize: 18, bold: true, color: WHITE, fontFace: 'Calibri'
      });
      s4.addText(item.desc, {
        x: cx + 0.25, y: 3.05, w: cardW - 0.5, h: 2.4,
        fontSize: 12, color: LIGHT_GRAY, fontFace: 'Calibri', wrap: true
      });
    });

    // CTA
    s4.addText('Ready to go deeper? Contact us at hello@evocs.tech', {
      x: 0.6, y: 6.05, w: 12, h: 0.35,
      fontSize: 12, color: LIGHT_GRAY, fontFace: 'Calibri', align: 'center'
    });

    // Footer
    s4.addText('EVOCS  |  PRIVATE AND CONFIDENTIAL  |  ' + dateStr, {
      x: 0.5, y: 7.1, w: 12.3, h: 0.25,
      fontSize: 9, color: '3F5E70', fontFace: 'Calibri', align: 'right', charSpacing: 1
    });

    // Download
    var safeName = company.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pptx.writeFile({ fileName: 'EVOCS_AI_Readiness_' + safeName + '.pptx' });
  }

  // Wire up the download button
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('agariDownloadBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      // Collect data from the quiz state exposed via globals
      var scores = typeof agariLastScores !== 'undefined' ? agariLastScores : [1,1,1,1,1,1];
      var level = typeof agariDominantPhase === 'function' ? agariDominantPhase(scores) : 3;
      var phaseDataMap = typeof agariPhaseData !== 'undefined' ? agariPhaseData : {};
      var phaseData = phaseDataMap[level] || { branded: 'Developing', summary: '', explanation: '', categoryText: '', productHtml: '' };
      var companyName = (document.getElementById('agariCompanyName') || {}).value || '';

      btn.textContent = 'Generating...';
      btn.disabled = true;

      try {
        generatePptx(companyName, scores, level, phaseData);
      } catch (e) {
        console.error('PPTX generation failed:', e);
        alert('Could not generate the file. Please try again.');
      }

      setTimeout(function () {
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download results';
        btn.disabled = false;
      }, 2500);
    });
  });
})();
