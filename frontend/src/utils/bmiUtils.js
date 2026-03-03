// BMI Utility Functions
export const getBMICategory = (bmi) => {
  if (bmi < 18.5) return { label:"Underweight", color:"#60a5fa", bg:"from-blue-500/10 to-blue-600/5", border:"border-blue-500/30", risk:"Low body weight risk" };
  if (bmi < 25)  return { label:"Normal",      color:"#34d399", bg:"from-emerald-500/10 to-emerald-600/5", border:"border-emerald-500/30", risk:"Healthy weight range" };
  if (bmi < 30)  return { label:"Overweight",  color:"#fbbf24", bg:"from-yellow-500/10 to-yellow-600/5", border:"border-yellow-500/30", risk:"Moderate health risk" };
  return               { label:"Obese",        color:"#f87171", bg:"from-red-500/10 to-red-600/5", border:"border-red-500/30", risk:"High health risk" };
};

export const heightToMeters = ({ unit, cm, meter, feet, inches }) => {
  if (unit === "cm") return parseFloat(cm) / 100;
  if (unit === "meter") return parseFloat(meter);
  if (unit === "feet") return ((parseFloat(feet) * 12) + parseFloat(inches || 0)) * 0.0254;
  return 0;
};

export const calcBMI = (weight, heightM) => weight / (heightM * heightM);
export const idealWeightRange = (heightM) => ({
  min: (18.5 * heightM * heightM).toFixed(1),
  max: (24.9 * heightM * heightM).toFixed(1)
});