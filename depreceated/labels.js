export const axisZDiv = document.createElement('div');
axisZDiv.className = 'label';
axisZDiv.textContent = '𝑧';
axisZDiv.style.color = '#4caf50';
axisZDiv.style.marginTop = '-1.5em';
axisZDiv.style.fontSize = '26px';
axisZDiv.style.textShadow =
  '-2px 0 #1f1f1f, 0 2px #1f1f1f, 2px 0 #1f1f1f, 0 -2px #1f1f1f';

axisZDiv.style.fontWeight = 'bold';

export const axisXDiv = document.createElement('div');
axisXDiv.className = 'label';
axisXDiv.textContent = '𝑥';
axisXDiv.style.color = '#3f51b5';
axisXDiv.style.fontSize = '26px';

axisXDiv.style.marginTop = '-1em';

axisXDiv.style.textShadow =
  '-2px 0 #1f1f1f, 0 2px #1f1f1f, 2px 0 #1f1f1f, 0 -2px #1f1f1f';

axisXDiv.style.fontWeight = 'bold';

export const axisYDiv = document.createElement('div');
axisYDiv.className = 'label';
axisYDiv.textContent = '𝑦';
axisYDiv.style.color = '#e91e63';
axisYDiv.style.textShadow =
  '-2px 0 #1f1f1f, 0 2px #1f1f1f, 2px 0 #1f1f1f, 0 -2px #1f1f1f';
axisYDiv.style.marginTop = '-1em';
axisYDiv.style.fontWeight = '800';
axisYDiv.style.fontSize = '26px';

export const vectorDiv = document.createElement('div');
vectorDiv.style.textShadow =
  '-2px 0 #303030, 0 2px #303030, 2px 0 #303030, 0 -2px #303030';
vectorDiv.className = 'label';
vectorDiv.style.marginTop = '-1.5em';
vectorDiv.style.fontWeight = 'bold';
axisYDiv.style.fontSize = '22px';

export const determinantDiv = document.createElement('div');

determinantDiv.className = 'label';
determinantDiv.style.marginTop = '0em';
determinantDiv.style.fontWeight = 'bold';
