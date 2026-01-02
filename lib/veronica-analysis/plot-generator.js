/**
 * PlotGenerator - Graph and visualization generator
 * ASCII art plots and data visualizations for CLI
 * 
 * @author xaoex
 */

class PlotGenerator {
  constructor(options = {}) {
    this.options = {
      width: options.width || 60,
      height: options.height || 20,
      includeAxis: options.includeAxis !== false,
      includeLabels: options.includeLabels !== false,
      ...options
    };
  }
  
  /**
   * Generate a plot based on type
   */
  generate(data, type = 'line', options = {}) {
    const generators = {
      line: (d, o) => this.generateLinePlot(d, o),
      scatter: (d, o) => this.generateScatterPlot(d, o),
      bar: (d, o) => this.generateBarChart(d, o),
      histogram: (d, o) => this.generateHistogram(d, o),
      heatmap: (d, o) => this.generateHeatmap(d, o)
    };
    
    const generator = generators[type] || generators.line;
    return generator(data, { ...this.options, ...options });
  }
  
  /**
   * Generate line plot
   */
  generateLinePlot(data, options = {}) {
    const width = options.width || this.options.width;
    const height = options.height || this.options.height;
    
    // Extract data points
    let points = this._extractPoints(data);
    
    if (points.length === 0) {
      return this._generateEmptyPlot('No data to plot');
    }
    
    // Normalize points to plot dimensions
    const normalized = this._normalizePoints(points, width, height);
    
    // Create plot grid
    const grid = this._createGrid(width, height);
    
    // Plot points and connect with lines
    for (let i = 0; i < normalized.length; i++) {
      const point = normalized[i];
      grid[point.y][point.x] = '●';
      
      // Connect to next point
      if (i < normalized.length - 1) {
        const next = normalized[i + 1];
        const connecting = this._getConnectingPoints(point, next);
        connecting.forEach(p => {
          if (grid[p.y][p.x] === ' ') {
            grid[p.y][p.x] = '·';
          }
        });
      }
    }
    
    // Convert grid to string
    return this._gridToString(grid, {
      title: options.title || 'Line Plot',
      xLabel: options.xLabel || 'X',
      yLabel: options.yLabel || 'Y'
    });
  }
  
  /**
   * Generate scatter plot
   */
  generateScatterPlot(data, options = {}) {
    const width = options.width || this.options.width;
    const height = options.height || this.options.height;
    
    let points = this._extractPoints(data);
    
    if (points.length === 0) {
      return this._generateEmptyPlot('No data to plot');
    }
    
    const normalized = this._normalizePoints(points, width, height);
    const grid = this._createGrid(width, height);
    
    // Plot points
    normalized.forEach(point => {
      grid[point.y][point.x] = '○';
    });
    
    return this._gridToString(grid, {
      title: options.title || 'Scatter Plot',
      xLabel: options.xLabel || 'X',
      yLabel: options.yLabel || 'Y'
    });
  }
  
  /**
   * Generate bar chart
   */
  generateBarChart(data, options = {}) {
    const width = options.width || this.options.width;
    const height = options.height || this.options.height;
    
    // Extract values using standardized helper
    const values = this._extractValues(data);
    
    if (values.length === 0) {
      return this._generateEmptyPlot('No data to plot');
    }
    
    const max = Math.max(...values);
    const lines = [];
    
    lines.push('╔' + '═'.repeat(width) + '╗');
    lines.push('║' + (options.title || 'Bar Chart').padEnd(width) + '║');
    lines.push('╠' + '═'.repeat(width) + '╣');
    
    // Create bars
    const barWidth = Math.floor((width - 10) / values.length);
    
    for (let row = height; row > 0; row--) {
      let line = '║ ';
      const threshold = (row / height) * max;
      
      for (let i = 0; i < values.length; i++) {
        if (values[i] >= threshold) {
          line += '█'.repeat(barWidth);
        } else {
          line += ' '.repeat(barWidth);
        }
      }
      
      line = line.padEnd(width + 1) + '║';
      lines.push(line);
    }
    
    // Add labels
    let labelLine = '║ ';
    for (let i = 0; i < values.length; i++) {
      const label = String(i + 1).padEnd(barWidth);
      labelLine += label;
    }
    labelLine = labelLine.padEnd(width + 1) + '║';
    lines.push('╠' + '═'.repeat(width) + '╣');
    lines.push(labelLine);
    
    lines.push('╚' + '═'.repeat(width) + '╝');
    
    return lines.join('\n');
  }
  
  /**
   * Generate histogram
   */
  generateHistogram(data, options = {}) {
    const width = options.width || this.options.width;
    const height = options.height || this.options.height;
    const bins = options.bins || 10;
    
    // Extract values using standardized helper
    const values = this._extractValues(data);
    
    if (values.length === 0) {
      return this._generateEmptyPlot('No data to plot');
    }
    
    // Create bins
    const min = Math.min(...values);
    const max = Math.max(...values);
    const binSize = (max - min) / bins;
    const binCounts = new Array(bins).fill(0);
    
    values.forEach(v => {
      const binIndex = Math.min(Math.floor((v - min) / binSize), bins - 1);
      binCounts[binIndex]++;
    });
    
    const maxCount = Math.max(...binCounts);
    const lines = [];
    
    lines.push('╔' + '═'.repeat(width) + '╗');
    lines.push('║' + (options.title || 'Histogram').padEnd(width) + '║');
    lines.push('╠' + '═'.repeat(width) + '╣');
    
    const barWidth = Math.floor((width - 10) / bins);
    
    for (let row = height; row > 0; row--) {
      let line = '║ ';
      const threshold = (row / height) * maxCount;
      
      for (let i = 0; i < bins; i++) {
        if (binCounts[i] >= threshold) {
          line += '▓'.repeat(barWidth);
        } else {
          line += ' '.repeat(barWidth);
        }
      }
      
      line = line.padEnd(width + 1) + '║';
      lines.push(line);
    }
    
    lines.push('╚' + '═'.repeat(width) + '╝');
    
    return lines.join('\n');
  }
  
  /**
   * Generate heatmap
   */
  generateHeatmap(data, options = {}) {
    const width = options.width || this.options.width;
    
    // Assume data is a 2D array or matrix
    let matrix = data.matrix || data;
    
    if (!Array.isArray(matrix) || !Array.isArray(matrix[0])) {
      return this._generateEmptyPlot('Invalid matrix data');
    }
    
    const lines = [];
    const chars = [' ', '░', '▒', '▓', '█'];
    
    lines.push('╔' + '═'.repeat(width) + '╗');
    lines.push('║' + (options.title || 'Heatmap').padEnd(width) + '║');
    lines.push('╠' + '═'.repeat(width) + '╣');
    
    // Find min and max values
    const flat = matrix.flat();
    const min = Math.min(...flat);
    const max = Math.max(...flat);
    const range = max - min;
    
    matrix.forEach(row => {
      let line = '║ ';
      row.forEach(val => {
        const normalized = range > 0 ? (val - min) / range : 0;
        const charIndex = Math.min(Math.floor(normalized * chars.length), chars.length - 1);
        line += chars[charIndex];
      });
      line = line.padEnd(width + 1) + '║';
      lines.push(line);
    });
    
    lines.push('╚' + '═'.repeat(width) + '╝');
    
    return lines.join('\n');
  }
  
  /**
   * Generate time series plot
   */
  generateTimeSeriesPlot(data, options = {}) {
    // Prepare time series data
    const timeData = {
      ...data,
      x: data.x || { variable: 'Time' },
      y: data.y || { variable: 'Value' }
    };
    
    return this.generateLinePlot(timeData, {
      ...options,
      title: options.title || 'Time Series',
      xLabel: 'Time',
      yLabel: 'Value'
    });
  }
  
  /**
   * Extract points from data
   * Unified data extraction helper to handle multiple input formats
   */
  _extractPoints(data) {
    if (!data) return [];
    
    // If data is already an array of points
    if (Array.isArray(data) && data.length > 0) {
      if (typeof data[0] === 'object' && 'x' in data[0] && 'y' in data[0]) {
        return data;
      }
      
      // If it's an array of numbers, convert to points
      if (typeof data[0] === 'number') {
        return data.map((y, x) => ({ x, y }));
      }
    }
    
    // If data has dataset field
    if (data.dataset && Array.isArray(data.dataset)) {
      if (typeof data.dataset[0] === 'number') {
        return data.dataset.map((y, x) => ({ x, y }));
      }
      
      if (typeof data.dataset[0] === 'object') {
        return data.dataset.map((item, idx) => ({
          x: item.x !== undefined ? item.x : idx,
          y: item.y !== undefined ? item.y : item.value || 0
        }));
      }
    }
    
    return [];
  }
  
  /**
   * Extract values for bar charts and histograms
   * Standardized value extraction across different data formats
   */
  _extractValues(data) {
    let values = Array.isArray(data.dataset) ? data.dataset : data;
    
    if (!Array.isArray(values) || values.length === 0) {
      return [];
    }
    
    // If values are objects with a 'value' field, extract it
    if (typeof values[0] === 'object' && values[0].value !== undefined) {
      return values.map(v => v.value);
    }
    
    // If values are numbers, return as-is
    if (typeof values[0] === 'number') {
      return values;
    }
    
    return [];
  }
  
  /**
   * Normalize points to grid coordinates
   */
  _normalizePoints(points, width, height) {
    if (points.length === 0) return [];
    
    const xValues = points.map(p => p.x);
    const yValues = points.map(p => p.y);
    
    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);
    
    const rangeX = maxX - minX || 1;
    const rangeY = maxY - minY || 1;
    
    return points.map(p => ({
      x: Math.floor(((p.x - minX) / rangeX) * (width - 1)),
      y: height - 1 - Math.floor(((p.y - minY) / rangeY) * (height - 1))
    }));
  }
  
  /**
   * Create empty grid
   */
  _createGrid(width, height) {
    return Array(height).fill(null).map(() => Array(width).fill(' '));
  }
  
  /**
   * Get connecting points between two points (for line drawing)
   */
  _getConnectingPoints(p1, p2) {
    const points = [];
    const dx = Math.abs(p2.x - p1.x);
    const dy = Math.abs(p2.y - p1.y);
    const sx = p1.x < p2.x ? 1 : -1;
    const sy = p1.y < p2.y ? 1 : -1;
    
    let err = dx - dy;
    let x = p1.x;
    let y = p1.y;
    
    while (x !== p2.x || y !== p2.y) {
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x += sx;
      }
      if (e2 < dx) {
        err += dx;
        y += sy;
      }
      
      if (x !== p2.x || y !== p2.y) {
        points.push({ x, y });
      }
    }
    
    return points;
  }
  
  /**
   * Convert grid to string with borders and labels
   */
  _gridToString(grid, options = {}) {
    const lines = [];
    const width = grid[0].length;
    
    lines.push('╔' + '═'.repeat(width + 2) + '╗');
    lines.push('║ ' + (options.title || 'Plot').padEnd(width) + ' ║');
    lines.push('╠' + '═'.repeat(width + 2) + '╣');
    
    grid.forEach(row => {
      lines.push('║ ' + row.join('') + ' ║');
    });
    
    lines.push('╚' + '═'.repeat(width + 2) + '╝');
    
    if (options.xLabel) {
      lines.push('  ' + options.xLabel.padStart(width / 2));
    }
    
    return lines.join('\n');
  }
  
  /**
   * Generate empty plot message
   */
  _generateEmptyPlot(message) {
    const lines = [];
    const width = this.options.width;
    
    lines.push('╔' + '═'.repeat(width) + '╗');
    lines.push('║' + message.padEnd(width) + '║');
    lines.push('╚' + '═'.repeat(width) + '╝');
    
    return lines.join('\n');
  }
}

module.exports = { PlotGenerator };
