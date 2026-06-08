const experienceContent = {
  exp01: "EXPERIENCE 1 DETAIL PROFILE:\n• Optimized backend data pipelines using C++, dropping frame cycle calculation overloads by 14%.\n• Managed threading buffers across internal engine subsystems.",
  exp02: "EXPERIENCE 2 DETAIL PROFILE:\n• Implemented custom gameplay mechanics and controller mapping wrappers inside Unity.\n• Refactored system scripts to minimize runtime allocation spikes.",
  exp03: "EXPERIENCE 3 DETAIL PROFILE:\n• Custom system architecture and deployment profiling documentation goes right here.",
  exp04: "EXPERIENCE 4 DETAIL PROFILE:\n• Details regarding systems infrastructure or graphics pipeline programming milestones.",
  exp05: "EXPERIENCE 5 DETAIL PROFILE:\n• Academic achievements, technical research, or computer science foundations documentation."
};

// Node Selector
document.querySelectorAll('.timeline-node').forEach(node => {
  node.addEventListener('click', () => {
    document.querySelectorAll('.timeline-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');


    const selectedKey = node.getAttribute('data-exp');
    document.getElementById('expDetailsText').textContent = experienceContent[selectedKey];
  });
});

document.querySelector('.timeline-node[data-exp="exp01"]').click();