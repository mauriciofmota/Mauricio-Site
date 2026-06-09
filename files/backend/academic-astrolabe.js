const DEBUG_MODE = false;
const EXTRA_TIP_SPACING = 20;


const DESC_FONT_SCALE_MULTIPLIER = 1.40;

const CORE_STYLE = {
  backgroundColor: "#ffffff",
  strokeColor: "rgba(0, 0, 0, 0.08)",
  lineWidth: 1.5,
  textColor: "#222222"
};

const ACADEMIC_DATA = [
  // SUPERIOR
  { title: "1st Semester Basics", type: "semester", chronology: 1, importance: 2, lat: "45.12° N", lng: "12.34° E", desc: "Introduction to computing architectures and basic algorithmic thinking logic." },
  { title: "Mathematics & Logic", type: "semester", chronology: 1, importance: 1, lat: "48.56° N", lng: "02.21° W", desc: "Discrete mathematics, boolean algebra, and formal propositional logic matrices." },
  { title: "Object-Oriented Coding", type: "semester", chronology: 2, importance: 3, lat: "51.50° N", lng: "00.12° W", desc: "Solidifying OOP principles, encapsulation, polymorphism, and early design patterns." },
  { title: "Scrum Master Basics", type: "certification", chronology: 2, importance: 2, lat: "55.67° N", lng: "12.56° E", desc: "Agile methodologies foundation, sprint planning, and team delivery synchronization." },
  { title: "Data Structures & Systems", type: "semester", chronology: 3, importance: 5, lat: "59.33° N", lng: "18.06° E", desc: "Advanced memory allocation, trees, algorithms complexity optimization graphs." },

  // RIGHT
  { title: "Database Management", type: "semester", chronology: 3, importance: 3, lat: "35.67° N", lng: "139.65° E", desc: "Relational models, SQL normalization, indexing optimizations, and ACID transactions." },
  { title: "English Advanced C1", type: "certification", chronology: 4, importance: 3, lat: "31.23° N", lng: "121.47° E", desc: "International certificate verifying global technical communication fluency." },
  { title: "Operating Systems Core", type: "semester", chronology: 4, importance: 5, lat: "22.39° N", lng: "114.16° E", desc: "Kernel operations, process scheduling, thread concurrency, and memory mapping systems." },
  { title: "UI/UX Technical Design", type: "semester", chronology: 4, importance: 1, lat: "01.35° N", lng: "103.81° E", desc: "User interface guidelines, human-computer interaction models, and wireframing." },
  { title: "Web Backend Engines", type: "semester", chronology: 5, importance: 4, lat: "33.86° S", lng: "151.20° E", desc: "RESTful APIs engineering, middleware design, authentication protocols, and server performance." },

  // INFERIOR
  { title: "Linux SysAdmin Cert", type: "certification", chronology: 5, importance: 3, lat: "34.05° S", lng: "18.42° E", desc: "Bash scripting automation, user permissions matrix, and secure network configuration." },
  { title: "Cloud Infrastructure Cert", type: "certification", chronology: 6, importance: 5, lat: "26.20° S", lng: "28.04° E", desc: "AWS / Cloudflare infrastructure integration, serverless systems management." },
  { title: "Software Architecture", type: "semester", chronology: 6, importance: 5, lat: "15.78° S", lng: "47.92° W", desc: "Microservices design, event-driven pipelines, clean architecture, and domain-driven development." },
  { title: "Docker & CI/CD Pipelines", type: "certification", chronology: 6, importance: 4, lat: "23.55° S", lng: "46.63° W", desc: "Containerization strategies, automated testing suites, and seamless deployment workflows." },
  { title: "Network Security Protocols", type: "semester", chronology: 7, importance: 4, lat: "34.60° S", lng: "58.38° W", desc: "Cryptography implementations, SSL/TLS handshakes, firewalls, and vulnerability assessments." },

  // LEFT
  { title: "Mobile Game Dev Labs", type: "semester", chronology: 7, importance: 2, lat: "25.76° N", lng: "80.19° W", desc: "Resource management under tight hardware constraints and touch input optimization frameworks." },
  { title: "Spanish Technical B2", type: "certification", chronology: 7, importance: 2, lat: "40.41° N", lng: "03.70° W", desc: "Intermediate conversational and documentation reading proficiency certificate." },
  { title: "Distributed Architecture", type: "semester", chronology: 8, importance: 4, lat: "37.77° N", lng: "122.41° W", desc: "Final capstone specialization handling concurrent networks, pipelines, and server engines." },
  { title: "Distributed Databases", type: "semester", chronology: 8, importance: 5, lat: "47.60° N", lng: "122.33° W", desc: "Sharding techniques, replication lag strategies, CAP Theorem trade-offs, and NoSQL clusters." },
  { title: "AI & Data Engineering", type: "semester", chronology: 8, importance: 3, lat: "45.50° N", lng: "73.56° W", desc: "Data processing pipelines, mathematical models, and fundamental machine learning algorithms." }
];

document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("academicCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const detailsBox = document.getElementById("academicDetailsBox");
  if (detailsBox) detailsBox.style.display = "none";

  const dpr = (window.devicePixelRatio || 1) * 2; 
  const logicalWidth = 1200;
  const logicalHeight = 750;

  canvas.width = logicalWidth * dpr;
  canvas.height = logicalHeight * dpr;
  canvas.style.width = logicalWidth + "px";
  canvas.style.height = logicalHeight + "px";
  ctx.scale(dpr, dpr);

  const centerX = logicalWidth / 2;
  const centerY = logicalHeight / 2;
  const baseRadius = 140;       

  let hoveredItem = null;
  let lastHoveredItem = null;
  let typewriterProgress = 0;
  let lastTime = 0;

  const e1_Right = 240; const e1_Left = 320; const e1_Y = 230; 
  const e2_Right = 310; const e2_Left = 430; const e2_Y = 320; 

  function randomizeShardOrbits(isInitialBoot = false) {
    const totalItems = ACADEMIC_DATA.length;

    ACADEMIC_DATA.forEach((item, index) => {
      const angle = (index * (Math.PI * 2 / totalItems)) - Math.PI / 2;
      const dirX = Math.cos(angle);
      const isLeftQuadrant = dirX < 0;

      const newTargetEllipse = Math.random() > 0.5 ? 1 : 2;
      const newNoiseFactor = 0.85 + Math.random() * 0.25;

      let baseEllipseX = newTargetEllipse === 1 ? (isLeftQuadrant ? e1_Left : e1_Right) : (isLeftQuadrant ? e2_Left : e2_Right);
      let baseEllipseY = newTargetEllipse === 1 ? e1_Y : e2_Y;

      baseEllipseX *= newNoiseFactor;
      baseEllipseY *= newNoiseFactor;

      item.targetEllipse = newTargetEllipse;
      item.targetEllipseX = baseEllipseX;
      item.targetEllipseY = baseEllipseY;

      if (isInitialBoot) {
        item.currentOpacity = 1.0;
        item.currentHoverLerp = 0;
        item.currentEllipseX = baseEllipseX;
        item.currentEllipseY = baseEllipseY;
      }
    });
  }

  randomizeShardOrbits(true);

  function calculateArrowProperties(item) {
    const isImportant = item.importance >= 4;
    const arrowWidth = isImportant ? 12 : 5; 
    
    let color = "#00bcff"; 
    if (item.type === "certification") color = "#ffaa00"; 
    if (isImportant) color = "#ff0055"; 
    
    return { width: arrowWidth, color, isGoalCritical: isImportant };
  }


  function drawArrowBody(context, sX, sY, eX, eY, properties) {
    context.beginPath();
    context.moveTo(sX, sY);
    context.lineTo(eX, eY);
    context.strokeStyle = properties.color;
    context.lineWidth = properties.width * 0.5;
    context.lineCap = "round"; 
    context.stroke();
  }

  function drawArrowTip(context, eX, eY, properties, angle) {
    context.save();
    context.translate(eX, eY);
    context.rotate(angle); 
    context.strokeStyle = properties.color;
    context.fillStyle = "#ffffff"; 
    context.lineWidth = 1.5;
    context.beginPath();
    context.arc(0, 0, (properties.width * 0.5) + 3, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.restore();
  }

  function drawAsymmetricEllipseGuide(context, rX_Right, rX_Left, rY, strokeStyle) {
    context.save();
    context.strokeStyle = strokeStyle;
    context.lineWidth = 1;
    context.setLineDash([4, 6]);
    context.beginPath();
    context.ellipse(centerX, centerY, rX_Right, rY, 0, -Math.PI / 2, Math.PI / 2, false);
    context.ellipse(centerX, centerY, rX_Left, rY, 0, Math.PI / 2, -Math.PI / 2, false);
    context.stroke();
    context.restore();
  }

  function wrapText(context, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;
    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      if (context.measureText(testLine).width > maxWidth && n > 0) {
        context.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    context.fillText(line, x, currentY);
  }

  function calculateAutoBoxDimensions(context, title, description, maxWidth, lineHeight) {
    context.save();
    context.font = "bold 18px sans-serif";
    const titleWidth = context.measureText(title).width;
    
    let boxWidth = Math.max(340, Math.min(maxWidth, titleWidth + 44)); 
    
    const fontSize = 14 * DESC_FONT_SCALE_MULTIPLIER;
    context.font = `500 ${fontSize}px sans-serif`;
    
    const words = description.split(' ');
    let line = '';
    let lineCount = 1;
    const textWidthTarget = boxWidth - 44; 

    for (let n = 0; n < words.length; n++) {
      let testLine = line + words[n] + ' ';
      if (context.measureText(testLine).width > textWidthTarget && n > 0) {
        line = words[n] + ' ';
        lineCount++;
      } else {
        line = testLine;
      }
    }
    context.restore();

    const headerHeight = 82;
    const paddingBottom = 22;
    let boxHeight = headerHeight + (lineCount * lineHeight) + paddingBottom;

    return { width: boxWidth, height: Math.max(160, boxHeight) };
  }


  function updateAndRender(timestamp) {
    if (!lastTime) lastTime = timestamp;
    const deltaTime = timestamp - lastTime;
    lastTime = timestamp;

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);

    const isAnyHovered = hoveredItem !== null;
    const totalItems = ACADEMIC_DATA.length;

    if (DEBUG_MODE) {
      drawAsymmetricEllipseGuide(ctx, e1_Right, e1_Left, e1_Y, "rgba(255, 0, 0, 0.12)");
      drawAsymmetricEllipseGuide(ctx, e2_Right, e2_Left, e2_Y, "rgba(255, 0, 0, 0.12)");
    }


    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, baseRadius, 0, Math.PI * 2);
    ctx.fillStyle = CORE_STYLE.backgroundColor; 
    ctx.fill();
    ctx.strokeStyle = CORE_STYLE.strokeColor;
    ctx.lineWidth = CORE_STYLE.lineWidth;
    ctx.stroke();

    ctx.fillStyle = CORE_STYLE.textColor;
    ctx.font = "bold 12px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("RANDOMIZE RADAR", centerX, centerY);
    ctx.restore();
    
    ACADEMIC_DATA.forEach((item, index) => {
      const angle = (index * (Math.PI * 2 / totalItems)) - Math.PI / 2;
      const props = calculateArrowProperties(item);

      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);

      item.currentEllipseX += (item.targetEllipseX - item.currentEllipseX) * 0.06;
      item.currentEllipseY += (item.targetEllipseY - item.currentEllipseY) * 0.06;

      let targetOpacity = isAnyHovered ? ((hoveredItem === item) ? 1.0 : 0.12) : 1.0;
      item.currentOpacity += (targetOpacity - item.currentOpacity) * 0.08;

      let targetHover = (hoveredItem === item) ? 1.0 : 0;
      item.currentHoverLerp += (targetHover - item.currentHoverLerp) * 0.06;

      const fullLengthX = dirX * item.currentEllipseX;
      const fullLengthY = dirY * item.currentEllipseY;
      let distanceToTip = Math.sqrt(fullLengthX * fullLengthX + fullLengthY * fullLengthY);

      const MIN_TAIL_RADIUS = baseRadius + 30; 
      const MIN_SHARD_LENGTH = 45;
      
      if (distanceToTip < MIN_TAIL_RADIUS + MIN_SHARD_LENGTH) {
        distanceToTip = MIN_TAIL_RADIUS + MIN_SHARD_LENGTH;
      }

      const startX = centerX + dirX * MIN_TAIL_RADIUS;
      const startY = centerY + dirY * MIN_TAIL_RADIUS;

      const baseEndX = centerX + dirX * distanceToTip;
      const baseEndY = centerY + dirY * distanceToTip;

      const hoverPushX = dirX * 12 * item.currentHoverLerp;
      const hoverPushY = dirY * 8 * item.currentHoverLerp;

      const endX = baseEndX + hoverPushX;
      const endY = baseEndY + hoverPushY;

      ctx.save();
      ctx.globalAlpha = item.currentOpacity; 

      if (item.currentHoverLerp > 0.1) {
        ctx.shadowBlur = 15 * item.currentHoverLerp;
        ctx.shadowColor = props.color;
      }

      drawArrowBody(ctx, startX, startY, endX, endY, props);
      drawArrowTip(ctx, endX, endY, props, angle);
      
      ctx.restore();

      item.rayCoords = { startX, startY, endX, endY, tolerance: props.width * 2.5 };
    });

    if (hoveredItem) {
      const index = ACADEMIC_DATA.indexOf(hoveredItem);
      const angle = (index * (Math.PI * 2 / totalItems)) - Math.PI / 2;
      const props = calculateArrowProperties(hoveredItem);

      const maxAllowedBoxWidth = 370;
      const textLineHeight = Math.round(20 * DESC_FONT_SCALE_MULTIPLIER); 

      const dynamicSize = calculateAutoBoxDimensions(ctx, hoveredItem.title, hoveredItem.desc, maxAllowedBoxWidth, textLineHeight);
      const boxWidth = dynamicSize.width;
      const boxHeight = dynamicSize.height;
      
      const dirX = Math.cos(angle);
      const dirY = Math.sin(angle);

      const fullLengthX = dirX * hoveredItem.currentEllipseX;
      const fullLengthY = dirY * hoveredItem.currentEllipseY;
      let distanceToTip = Math.sqrt(fullLengthX * fullLengthX + fullLengthY * fullLengthY);

      const MIN_TAIL_RADIUS = baseRadius + 30;
      const MIN_SHARD_LENGTH = 45;
      if (distanceToTip < MIN_TAIL_RADIUS + MIN_SHARD_LENGTH) {
        distanceToTip = MIN_TAIL_RADIUS + MIN_SHARD_LENGTH;
      }

      const hoverPushX = dirX * 12 * hoveredItem.currentHoverLerp;
      const hoverPushY = dirY * 8 * hoveredItem.currentHoverLerp;

      const targetX = centerX + dirX * distanceToTip + hoverPushX + (dirX * EXTRA_TIP_SPACING);
      const targetY = centerY + dirY * distanceToTip + hoverPushY + (dirY * EXTRA_TIP_SPACING);

      const boxPos = calculateBoxPosition(targetX, targetY, dirX, dirY, boxWidth, boxHeight, angle, logicalWidth);
      
      let boxX = boxPos.boxX;
      let boxY = boxPos.boxY;

      if (boxX < 15) boxX = 15;
      if (boxX + boxWidth > logicalWidth) boxX = logicalWidth - boxWidth - 15;
      if (boxY < 15) boxY = 15;
      if (boxY + boxHeight > logicalHeight) boxY = logicalHeight - boxHeight - 15;

      if (hoveredItem !== lastHoveredItem) {
        lastHoveredItem = hoveredItem;
        typewriterProgress = 0; 
      }
      typewriterProgress += deltaTime * 0.045; 
      if (typewriterProgress > hoveredItem.desc.length) typewriterProgress = hoveredItem.desc.length;

      ctx.save();
      ctx.globalAlpha = hoveredItem.currentOpacity;
      ctx.shadowBlur = 20;
      ctx.shadowColor = "rgba(0, 0, 0, 0.08)";

      ctx.fillStyle = "rgba(255, 255, 255, 0.99)";
      ctx.strokeStyle = props.color; 
      ctx.lineWidth = 2.5; 
      
      ctx.beginPath();
      ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0; 

      // TITLE
      ctx.fillStyle = "#111111";
      ctx.font = "bold 18px sans-serif";
      ctx.textAlign = "left";
      ctx.fillText(hoveredItem.title, boxX + 20, boxY + 34);

      // SUBTITLE
      ctx.font = "bold 12px sans-serif";
      ctx.fillText(`${hoveredItem.type.toUpperCase()} | ORBIT ${hoveredItem.targetEllipse} | COORD: ${hoveredItem.lat}, ${hoveredItem.lng}`, boxX + 20, boxY + 54);

      ctx.strokeStyle = "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(boxX + 20, boxY + 66); ctx.lineTo(boxX + boxWidth - 20, boxY + 66); ctx.stroke();

      // 3DINAMIC DESCRITION
      ctx.fillStyle = "#333333"; 
      const computedDescFontSize = 14 * DESC_FONT_SCALE_MULTIPLIER;
      ctx.font = `500 ${computedDescFontSize}px sans-serif`;
      
      const currentTextString = hoveredItem.desc.substring(0, Math.floor(typewriterProgress));
      wrapText(ctx, currentTextString, boxX + 20, boxY + 90, boxWidth - 40, textLineHeight);

      ctx.restore();
    } else {
      lastHoveredItem = null;
    }

    requestAnimationFrame(updateAndRender);
  }

  function calculateBoxPosition(targetX, targetY, dirX, dirY, boxWidth, boxHeight, angle, canvasWidth) {
    const isDown = dirY > 0;
    let angleInDegrees = Math.round((angle + Math.PI / 2) * (180 / Math.PI));
    if (angleInDegrees < 0) angleInDegrees += 360;

    let anglePushOffset = 10; 
    const dynamicPushX = dirX * anglePushOffset;
    const dynamicPushY = dirY * anglePushOffset;

    let testRightX = targetX + dynamicPushX;
    let forceLeft = (testRightX + boxWidth > canvasWidth - 15);
    
    let testLeftX = targetX + dynamicPushX - boxWidth;
    let forceRight = (testLeftX < 15);

    let boxX;
    if (forceLeft) {
      boxX = targetX + dynamicPushX - boxWidth - (EXTRA_TIP_SPACING * 2);
    } else if (forceRight) {
      boxX = targetX + dynamicPushX + (EXTRA_TIP_SPACING * 2);
    } else {
      boxX = (dirX > 0) ? (targetX + dynamicPushX) : (targetX + dynamicPushX - boxWidth);
    }

    let boxY = isDown ? (targetY + dynamicPushY) : (targetY + dynamicPushY - boxHeight);

    if (angleInDegrees > 255 && angleInDegrees < 285) {
      return { boxX: targetX - (boxWidth / 2), boxY: targetY - boxHeight - 15, debugTargetX: targetX, debugTargetY: targetY };
    }
    if (angleInDegrees > 75 && angleInDegrees < 105) {
      return { boxX: targetX - (boxWidth / 2), boxY: targetY + 15, debugTargetX: targetX, debugTargetY: targetY };
    }

    if (Math.abs(dirY) < 0.3) {
      boxY = (targetY + dynamicPushY) - (boxHeight / 2);
    }
    if (Math.abs(dirX) < 0.3) {
      boxX = (targetX + dynamicPushX) - (boxWidth / 2);
    }

    return { boxX, boxY, debugTargetX: targetX + dynamicPushX, debugTargetY: targetY + dynamicPushY };
  }


  canvas.addEventListener("mousemove", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (logicalWidth / rect.width);
    const mouseY = (e.clientY - rect.top) * (logicalHeight / rect.height);

    let matchFound = null;

    for (let item of ACADEMIC_DATA) {
      if (!item.rayCoords) continue;
      const { startX, startY, endX, endY, tolerance } = item.rayCoords;
      
      const A = mouseX - startX; const B = mouseY - startY;
      const C = endX - startX; const D = endY - startY;
      const dot = A * C + B * D; const lenSq = C * C + D * D;
      let param = -1;
      if (lenSq !== 0) param = dot / lenSq;

      let xx, yy;
      if (param < 0) { xx = startX; yy = startY; }
      else if (param > 1) { xx = endX; yy = endY; }
      else { xx = startX + param * C; yy = startY + param * D; }

      const distance = Math.sqrt((mouseX - xx) ** 2 + (mouseY - mouseY) ** 2);
      const finalDistance = Math.sqrt((mouseX - xx) ** 2 + (mouseY - yy) ** 2);
      if (finalDistance < tolerance) {
        matchFound = item;
        break;
      }
    }

    if (matchFound !== hoveredItem) hoveredItem = matchFound;

    const distanceToCenter = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
    if (distanceToCenter < baseRadius) {
      canvas.style.cursor = "pointer";
    } else {
      canvas.style.cursor = "default";
    }
  });

  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left) * (logicalWidth / rect.width);
    const mouseY = (e.clientY - rect.top) * (logicalHeight / rect.height);

    const distanceToCenter = Math.sqrt((mouseX - centerX) ** 2 + (mouseY - centerY) ** 2);
    if (distanceToCenter < baseRadius) {
      randomizeShardOrbits(false);
    }
  });

  requestAnimationFrame(updateAndRender);
});