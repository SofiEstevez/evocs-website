// EVOCS AI Readiness Assessment — PPTX download
// Light, professional design. No dark backgrounds.

(function () {

  var LABELS = ['Governance', 'Decisioning', 'Knowledge', 'Documentation', 'Collaboration', 'Monitoring'];

  var QUESTION_LABELS = [
    'AI Governance Policy',
    'Use Case Evaluation',
    'Internal Knowledge Access',
    'Risk Documentation',
    'Cross-functional Collaboration',
    'Post-deployment Monitoring'
  ];

  var ANSWER_LABELS = [
    ['No formal policy', 'Some principles exist', 'Draft or partial policy', 'Formal policy enforced', 'Policy embedded in lifecycle'],
    ['No formal intake', 'Manual and inconsistent', 'Some shared criteria', 'Repeatable evaluation process', 'End-to-end decisioning'],
    ['No approved method', 'Manual research only', 'Some pilots exist', 'Controlled access in place', 'Scaled across the org'],
    ['No documentation', 'Partial documentation', 'Templates exist', 'Standard process defined', 'Embedded in all workflows'],
    ['Late or not at all', 'After development starts', 'Early but inconsistent', 'From the beginning', 'Before ideas become projects'],
    ['No monitoring', 'Ad hoc only', 'Basic monitoring', 'Systematic monitoring', 'Scalable with response plans']
  ];

  var PRODUCT_RECS = {
    1: { label: 'Where to start: Alba', items: [
        { name: 'Alba', desc: 'Establish your AI governance foundation: policy enforcement, audit trail, and a compliant operating layer before scaling.' },
        { name: 'EVOCS Assessment', desc: 'A structured diagnostic to map your current AI posture and define a prioritized, actionable roadmap.' }
    ]},
    2: { label: 'Recommended: Alba and Pontix', items: [
        { name: 'Alba', desc: 'Build the guardrails and governance operating layer your organization needs before scaling AI use cases.' },
        { name: 'Pontix', desc: 'Structured AI use case intake: converts plain-language ideas into scored, decision-ready business cases.' }
    ]},
    3: { label: 'Recommended: Pontix and Alba', items: [
        { name: 'Pontix', desc: 'AI-powered intake that structures, scores, and routes every AI opportunity through a consistent governance process.' },
        { name: 'Alba', desc: 'Unified governance layer that brings consistency, security, and auditability to your growing AI portfolio.' }
    ]},
    4: { label: 'Recommended: Alba and Lagos', items: [
        { name: 'Alba', desc: 'One platform for every AI initiative: governed workspace, reusable modules, and enterprise-grade security.' },
        { name: 'Lagos', desc: 'Your proprietary intelligence, instantly accessible. Query internal knowledge in plain language, securely.' }
    ]},
    5: { label: 'Full platform: Alba, Pontix, and Lagos', items: [
        { name: 'Alba', desc: 'Enterprise AI governance and compliance at scale, integrated into every stage of the AI lifecycle.' },
        { name: 'Pontix', desc: 'Intelligent intake connecting strategy, engineering, and business around prioritized AI investments.' },
        { name: 'Lagos', desc: 'Organization-wide AI knowledge access: every team, every function, instantly and securely.' }
    ]}
  };

  // ── Radar SVG builder ─────────────────────────────────────────────────────
  function buildRadarSVG(scores) {
    var W = 500, H = 500;
    var cx = 250, cy = 250;
    var outerR = 160;
    var levels = 5;
    var labelR = outerR + 52;

    // Grid rings
    var rings = '';
    for (var l = 1; l <= levels; l++) {
      var r = (l / levels) * outerR;
      var pts = [];
      for (var a = 0; a < 6; a++) {
        var ang = (-90 + a * 60) * Math.PI / 180;
        pts.push((cx + Math.cos(ang) * r).toFixed(1) + ',' + (cy + Math.sin(ang) * r).toFixed(1));
      }
      var opacity = l === levels ? '0.25' : '0.12';
      rings += '<polygon points="' + pts.join(' ') + '" fill="none" stroke="#94A3B8" stroke-width="' + (l === levels ? '1.5' : '1') + '" stroke-opacity="' + opacity + '"/>';
    }

    // Axis lines
    var axes = '';
    for (var a = 0; a < 6; a++) {
      var ang = (-90 + a * 60) * Math.PI / 180;
      var x2 = (cx + Math.cos(ang) * outerR).toFixed(1);
      var y2 = (cy + Math.sin(ang) * outerR).toFixed(1);
      axes += '<line x1="' + cx + '" y1="' + cy + '" x2="' + x2 + '" y2="' + y2 + '" stroke="#CBD5E1" stroke-width="1" stroke-dasharray="3 3"/>';
    }

    // Baseline polygon (industry average at 2.5)
    var basePts = [];
    for (var a = 0; a < 6; a++) {
      var ang = (-90 + a * 60) * Math.PI / 180;
      var r = (2.5 / 5) * outerR;
      basePts.push((cx + Math.cos(ang) * r).toFixed(1) + ',' + (cy + Math.sin(ang) * r).toFixed(1));
    }

    // Score polygon
    var scorePts = scores.map(function(v, i) {
      var ang = (-90 + i * 60) * Math.PI / 180;
      var r = (v / 5) * outerR;
      return (cx + Math.cos(ang) * r).toFixed(1) + ',' + (cy + Math.sin(ang) * r).toFixed(1);
    });

    // Dots on score polygon
    var dots = scores.map(function(v, i) {
      var ang = (-90 + i * 60) * Math.PI / 180;
      var r = (v / 5) * outerR;
      var x = (cx + Math.cos(ang) * r).toFixed(1);
      var y = (cy + Math.sin(ang) * r).toFixed(1);
      return '<circle cx="' + x + '" cy="' + y + '" r="5.5" fill="#FF456B" stroke="#fff" stroke-width="2"/>';
    }).join('');

    // Labels with score
    var labelsSVG = LABELS.map(function(label, i) {
      var ang = (-90 + i * 60) * Math.PI / 180;
      var lx = (cx + Math.cos(ang) * labelR).toFixed(1);
      var ly = (cy + Math.sin(ang) * labelR).toFixed(1);
      var score = scores[i];
      var anchor = 'middle';
      if (ang < -0.1) anchor = i === 0 ? 'middle' : (Math.cos(ang) > 0.3 ? 'start' : (Math.cos(ang) < -0.3 ? 'end' : 'middle'));

      return '<text x="' + lx + '" y="' + (parseFloat(ly) - 6).toFixed(1) + '" text-anchor="middle" font-family="Calibri,Arial,sans-serif" font-size="13" font-weight="700" fill="#1E293B">' + label + '</text>' +
             '<text x="' + lx + '" y="' + (parseFloat(ly) + 13).toFixed(1) + '" text-anchor="middle" font-family="Calibri,Arial,sans-serif" font-size="12" fill="#FF456B" font-weight="700">' + score + ' / 5</text>';
    }).join('');

    // Legend
    var legend = '<g transform="translate(15,' + (H - 38) + ')">' +
      '<rect x="0" y="0" width="12" height="12" rx="2" fill="#FF456B" opacity="0.2" stroke="#FF456B" stroke-width="1.5"/>' +
      '<text x="18" y="10" font-family="Calibri,Arial,sans-serif" font-size="11" fill="#64748B">Your result</text>' +
      '<rect x="110" y="0" width="12" height="12" rx="2" fill="#E2E8F0" stroke="#94A3B8" stroke-width="1.5"/>' +
      '<text x="128" y="10" font-family="Calibri,Arial,sans-serif" font-size="11" fill="#64748B">Industry average</text>' +
    '</g>';

    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ' + W + ' ' + H + '" width="' + W + '" height="' + H + '">' +
      '<rect width="' + W + '" height="' + H + '" fill="#FFFFFF"/>' +
      rings + axes +
      '<polygon points="' + basePts.join(' ') + '" fill="#E2E8F0" fill-opacity="0.5" stroke="#94A3B8" stroke-width="1.5" stroke-dasharray="4 3"/>' +
      '<polygon points="' + scorePts.join(' ') + '" fill="#FF456B" fill-opacity="0.14" stroke="#FF456B" stroke-width="2.5"/>' +
      dots + labelsSVG + legend +
    '</svg>';
  }

  function svgToDataUrl(svgStr) {
    try {
      return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgStr)));
    } catch(e) {
      return 'data:image/svg+xml;base64,' + btoa(svgStr);
    }
  }

  // ── Main generator ────────────────────────────────────────────────────────
  function generatePptx(companyName, scores, level, phaseData) {
    var pptx = new PptxGenJS();
    pptx.layout = 'LAYOUT_WIDE'; // 13.33 x 7.5 in

    // Palette — all light
    var RED      = 'FF456B';
    var DARK     = '0F172A';
    var MID      = '334155';
    var GRAY     = '64748B';
    var LIGHT_BG = 'F8FAFC';
    var RULE     = 'E2E8F0';
    var WHITE    = 'FFFFFF';
    var RED_BG   = 'FFF1F4';

    var avg = (scores.reduce(function(a, b) { return a + b; }, 0) / scores.length).toFixed(1);
    var today = new Date();
    var dateStr = today.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    var company = (companyName && companyName.trim()) ? companyName.trim() : 'Your Organization';

    // ── SLIDE 1: Cover ──────────────────────────────────────────────────────
    var s1 = pptx.addSlide();

    // White background
    s1.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:'100%', fill:{color:WHITE}, line:{color:WHITE} });

    // Red left accent bar
    s1.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.12, h:'100%', fill:{color:RED}, line:{color:RED} });

    // Light bg right panel
    s1.addShape(pptx.ShapeType.rect, { x:7.5, y:0, w:5.83, h:'100%', fill:{color:LIGHT_BG}, line:{color:RULE} });

    // EVOCS wordmark
    s1.addText('EVOCS', { x:0.4, y:0.45, w:6.8, h:0.4,
      fontSize:11, bold:true, color:RED, fontFace:'Calibri', charSpacing:5 });

    // Title
    s1.addText('AI Readiness\nAssessment Results', { x:0.4, y:1.05, w:6.8, h:2.4,
      fontSize:40, bold:true, color:DARK, fontFace:'Calibri', lineSpacingMultiple:1.1 });

    // Divider line
    s1.addShape(pptx.ShapeType.rect, { x:0.4, y:3.55, w:1.2, h:0.05, fill:{color:RED}, line:{color:RED} });

    // Company
    s1.addText(company, { x:0.4, y:3.75, w:6.8, h:0.5,
      fontSize:18, color:MID, fontFace:'Calibri', italic:true });

    // Date
    s1.addText(dateStr, { x:0.4, y:4.3, w:6.8, h:0.35,
      fontSize:12, color:GRAY, fontFace:'Calibri' });

    // Right panel score
    s1.addText('Maturity Score', { x:7.7, y:2.2, w:5.3, h:0.4,
      fontSize:12, color:GRAY, fontFace:'Calibri', align:'center' });
    s1.addText(avg, { x:7.7, y:2.6, w:5.3, h:1.5,
      fontSize:80, bold:true, color:DARK, fontFace:'Calibri', align:'center' });
    s1.addText('out of 5.0', { x:7.7, y:4.05, w:5.3, h:0.35,
      fontSize:13, color:GRAY, fontFace:'Calibri', align:'center' });

    // Red pill — phase label
    s1.addShape(pptx.ShapeType.rect, { x:8.9, y:4.55, w:2.9, h:0.48, fill:{color:RED_BG}, line:{color:RED}, rounding:true });
    s1.addText(phaseData.branded, { x:8.9, y:4.55, w:2.9, h:0.48,
      fontSize:13, bold:true, color:RED, fontFace:'Calibri', align:'center' });

    // Footer
    s1.addText('Confidential  |  ' + company + '  |  EVOCS', { x:0.4, y:7.15, w:12.4, h:0.25,
      fontSize:8, color:'CBD5E1', fontFace:'Calibri', align:'right', charSpacing:1 });

    // ── SLIDE 2: Maturity Profile (Radar chart) ──────────────────────────────
    var s2 = pptx.addSlide();
    s2.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:'100%', fill:{color:WHITE}, line:{color:WHITE} });

    // Header strip (light, not dark)
    s2.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:0.9, fill:{color:LIGHT_BG}, line:{color:RULE} });
    s2.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.12, h:'100%', fill:{color:RED}, line:{color:RED} });

    s2.addText('Your AI Maturity Profile', { x:0.35, y:0.2, w:9, h:0.55,
      fontSize:22, bold:true, color:DARK, fontFace:'Calibri' });
    s2.addText(company + '  |  EVOCS AI Readiness Assessment', { x:0.35, y:0.63, w:12.5, h:0.22,
      fontSize:9, color:GRAY, fontFace:'Calibri' });

    // Radar chart image
    var radarSVG = buildRadarSVG(scores);
    var radarDataUrl = svgToDataUrl(radarSVG);
    s2.addImage({ data: radarDataUrl, x:1.0, y:1.0, w:5.5, h:5.5 });

    // Right side: summary
    s2.addText(phaseData.branded, { x:7.2, y:1.1, w:5.7, h:0.6,
      fontSize:24, bold:true, color:RED, fontFace:'Calibri' });

    s2.addShape(pptx.ShapeType.rect, { x:7.2, y:1.75, w:5.7, h:0.04, fill:{color:RULE}, line:{color:RULE} });

    s2.addText('Overall Score', { x:7.2, y:1.9, w:2.5, h:0.35,
      fontSize:10, color:GRAY, fontFace:'Calibri', bold:true, charSpacing:1 });
    s2.addText(avg + ' / 5', { x:9.8, y:1.85, w:3.1, h:0.45,
      fontSize:22, bold:true, color:DARK, fontFace:'Calibri', align:'right' });

    s2.addShape(pptx.ShapeType.rect, { x:7.2, y:2.45, w:5.7, h:0.04, fill:{color:RULE}, line:{color:RULE} });

    s2.addText('What this means', { x:7.2, y:2.6, w:5.7, h:0.35,
      fontSize:11, bold:true, color:DARK, fontFace:'Calibri' });
    s2.addText(phaseData.summary, { x:7.2, y:3.0, w:5.7, h:0.8,
      fontSize:12, color:MID, fontFace:'Calibri', wrap:true });

    s2.addText(phaseData.explanation, { x:7.2, y:3.85, w:5.7, h:1.2,
      fontSize:11, color:GRAY, fontFace:'Calibri', wrap:true });

    s2.addShape(pptx.ShapeType.rect, { x:7.2, y:5.2, w:5.7, h:0.04, fill:{color:RULE}, line:{color:RULE} });
    s2.addText('Recommended direction', { x:7.2, y:5.35, w:5.7, h:0.35,
      fontSize:11, bold:true, color:DARK, fontFace:'Calibri' });
    s2.addText(phaseData.categoryText, { x:7.2, y:5.75, w:5.7, h:0.9,
      fontSize:11, color:GRAY, fontFace:'Calibri', wrap:true });

    // Footer
    s2.addText('Confidential  |  ' + company + '  |  EVOCS', { x:0.4, y:7.15, w:12.4, h:0.25,
      fontSize:8, color:'CBD5E1', fontFace:'Calibri', align:'right', charSpacing:1 });

    // ── SLIDE 3: Dimension Breakdown ─────────────────────────────────────────
    var s3 = pptx.addSlide();
    s3.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:'100%', fill:{color:WHITE}, line:{color:WHITE} });
    s3.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:0.9, fill:{color:LIGHT_BG}, line:{color:RULE} });
    s3.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.12, h:'100%', fill:{color:RED}, line:{color:RED} });

    s3.addText('Dimension Breakdown', { x:0.35, y:0.2, w:9, h:0.55,
      fontSize:22, bold:true, color:DARK, fontFace:'Calibri' });
    s3.addText('Score per dimension  |  1 = early stage    5 = leading practice', { x:0.35, y:0.63, w:12.5, h:0.22,
      fontSize:9, color:GRAY, fontFace:'Calibri' });

    var startY = 1.05;
    var rowH = 0.92;
    var barMaxW = 7.8;

    scores.forEach(function(score, i) {
      var y = startY + i * rowH;
      var answer = ANSWER_LABELS[i] && ANSWER_LABELS[i][score - 1] ? ANSWER_LABELS[i][score - 1] : '';
      var barW = (score / 5) * barMaxW;
      var scoreColor = score >= 4 ? '059669' : score === 3 ? 'D97706' : RED;

      // Alternating row tint
      if (i % 2 === 0) {
        s3.addShape(pptx.ShapeType.rect, { x:0.2, y:y - 0.04, w:12.9, h:rowH - 0.04,
          fill:{color:'F8FAFC'}, line:{color:'F8FAFC'} });
      }

      // Dimension label
      s3.addText(QUESTION_LABELS[i], { x:0.35, y:y + 0.06, w:3.1, h:0.3,
        fontSize:11, bold:true, color:DARK, fontFace:'Calibri' });

      // User's answer
      s3.addText(answer, { x:0.35, y:y + 0.38, w:3.1, h:0.28,
        fontSize:9, color:GRAY, fontFace:'Calibri', italic:true });

      // Bar track
      s3.addShape(pptx.ShapeType.rect, { x:3.6, y:y + 0.3, w:barMaxW, h:0.22,
        fill:{color:'EEF2F7'}, line:{color:'EEF2F7'}, rounding:true });

      // Bar fill
      if (barW > 0.08) {
        s3.addShape(pptx.ShapeType.rect, { x:3.6, y:y + 0.3, w:barW, h:0.22,
          fill:{color:scoreColor}, line:{color:scoreColor}, rounding:true });
      }

      // Score
      s3.addText(score + ' / 5', { x:11.5, y:y + 0.24, w:1.3, h:0.32,
        fontSize:12, bold:true, color:scoreColor, fontFace:'Calibri', align:'right' });
    });

    // Footer
    s3.addText('Confidential  |  ' + company + '  |  EVOCS', { x:0.4, y:7.15, w:12.4, h:0.25,
      fontSize:8, color:'CBD5E1', fontFace:'Calibri', align:'right', charSpacing:1 });

    // ── SLIDE 4: Next Steps ──────────────────────────────────────────────────
    var s4 = pptx.addSlide();
    s4.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:'100%', fill:{color:WHITE}, line:{color:WHITE} });
    s4.addShape(pptx.ShapeType.rect, { x:0, y:0, w:'100%', h:0.9, fill:{color:LIGHT_BG}, line:{color:RULE} });
    s4.addShape(pptx.ShapeType.rect, { x:0, y:0, w:0.12, h:'100%', fill:{color:RED}, line:{color:RED} });

    s4.addText('Recommended Next Steps', { x:0.35, y:0.2, w:9, h:0.55,
      fontSize:22, bold:true, color:DARK, fontFace:'Calibri' });
    s4.addText('Based on your ' + phaseData.branded + ' maturity phase', { x:0.35, y:0.63, w:12.5, h:0.22,
      fontSize:9, color:GRAY, fontFace:'Calibri' });

    var rec = PRODUCT_RECS[level] || PRODUCT_RECS[3];
    var cardCount = rec.items.length;
    var cardW = cardCount === 3 ? 3.9 : 5.9;
    var cardGap = 0.2;
    var totalW = cardCount * cardW + (cardCount - 1) * cardGap;
    var startX = (13.33 - totalW) / 2;

    // Section label
    s4.addText(rec.label, { x:0.35, y:1.1, w:12.6, h:0.4,
      fontSize:13, bold:true, color:DARK, fontFace:'Calibri' });

    rec.items.forEach(function(item, i) {
      var cx = startX + i * (cardW + cardGap);

      // Card border
      s4.addShape(pptx.ShapeType.rect, { x:cx, y:1.65, w:cardW, h:4.0,
        fill:{color:WHITE}, line:{color:RULE, pt:1.5}, rounding:true });

      // Red top accent
      s4.addShape(pptx.ShapeType.rect, { x:cx, y:1.65, w:cardW, h:0.1,
        fill:{color:RED}, line:{color:RED} });

      // Red circle initial
      s4.addShape(pptx.ShapeType.ellipse, { x:cx + 0.25, y:2.0, w:0.48, h:0.48,
        fill:{color:RED_BG}, line:{color:RED, pt:1} });
      s4.addText(item.name.charAt(0), { x:cx + 0.25, y:2.0, w:0.48, h:0.48,
        fontSize:14, bold:true, color:RED, fontFace:'Calibri', align:'center', valign:'middle' });

      // Product name
      s4.addText(item.name, { x:cx + 0.85, y:2.05, w:cardW - 1.05, h:0.4,
        fontSize:16, bold:true, color:DARK, fontFace:'Calibri' });

      // Divider
      s4.addShape(pptx.ShapeType.rect, { x:cx + 0.25, y:2.62, w:cardW - 0.5, h:0.03,
        fill:{color:RULE}, line:{color:RULE} });

      // Description
      s4.addText(item.desc, { x:cx + 0.25, y:2.75, w:cardW - 0.5, h:2.6,
        fontSize:11, color:MID, fontFace:'Calibri', wrap:true, lineSpacingMultiple:1.3 });
    });

    // CTA strip
    s4.addShape(pptx.ShapeType.rect, { x:0, y:6.05, w:'100%', h:1.0,
      fill:{color:RED_BG}, line:{color:'FECDD3'} });
    s4.addText('Ready to go deeper?', { x:0.5, y:6.25, w:6, h:0.4,
      fontSize:14, bold:true, color:RED, fontFace:'Calibri' });
    s4.addText('Contact us at hello@evocs.tech to schedule a full assessment.', { x:0.5, y:6.6, w:12.3, h:0.3,
      fontSize:11, color:MID, fontFace:'Calibri' });

    // Footer
    s4.addText('Confidential  |  ' + company + '  |  EVOCS', { x:0.4, y:7.15, w:12.4, h:0.25,
      fontSize:8, color:'CBD5E1', fontFace:'Calibri', align:'right', charSpacing:1 });

    // Download
    var safeName = company.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    pptx.writeFile({ fileName: 'EVOCS_AI_Readiness_' + safeName + '.pptx' });
  }

  // ── Wire up button ────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', function () {
    var btn = document.getElementById('agariDownloadBtn');
    if (!btn) return;
    btn.addEventListener('click', function () {
      var scores = typeof agariLastScores !== 'undefined' ? agariLastScores : [1,1,1,1,1,1];
      var level = typeof agariDominantPhase === 'function' ? agariDominantPhase(scores) : 3;
      var phaseDataMap = typeof agariPhaseData !== 'undefined' ? agariPhaseData : {};
      var phaseData = phaseDataMap[level] || { branded:'Developing', summary:'', explanation:'', categoryText:'', productHtml:'' };
      var companyName = (document.getElementById('agariCompanyName') || {}).value || '';

      btn.textContent = 'Generating…';
      btn.disabled = true;

      try {
        generatePptx(companyName, scores, level, phaseData);
      } catch(e) {
        console.error('PPTX generation failed:', e);
        alert('Could not generate the file. Please try again.');
      }

      setTimeout(function() {
        btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download results';
        btn.disabled = false;
      }, 2500);
    });
  });

})();
