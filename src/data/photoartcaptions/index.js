import CanadaWaterfall from './CanadaWaterfall';
import yellowstoneRiver from './YellowStoneRiver';
import CanyonView from './canyonView';
import branch from './branch';

// Export all captions in an array, sorted by date (newest first)
const allCaptions = [
  yellowstoneRiver,
  CanadaWaterfall,
  CanyonView,
  branch,
  
].sort((a, b) => new Date(b.date) - new Date(a.date));

export default allCaptions;
