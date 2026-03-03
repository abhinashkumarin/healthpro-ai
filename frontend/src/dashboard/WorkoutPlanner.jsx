// Workout Planner
import { useState } from "react";
const API_BASE = import.meta.env.VITE_API_URL || "";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const PLANS = {
  Underweight: {
    goal:"💪 Muscle Building Plan",
    color:"#60a5fa",
    days:[
      {day:"Monday",workout:"Upper Body Strength",exercises:["Bench Press 3×10","Overhead Press 3×10","Dumbbell Rows 3×12","Bicep Curls 3×15"]},
      {day:"Tuesday",workout:"Lower Body + Core",exercises:["Squats 4×10","Deadlifts 3×8","Lunges 3×12","Plank 3×45sec"]},
      {day:"Wednesday",workout:"Active Rest",exercises:["30 min walk","Light stretching","Yoga 20 min"]},
      {day:"Thursday",workout:"Full Body Compound",exercises:["Pull-ups 3×8","Push-ups 4×15","Dips 3×10","Cable Rows 3×12"]},
      {day:"Friday",workout:"Cardio + Abs",exercises:["20 min cycling","Crunches 3×20","Leg Raises 3×15","Russian Twists 3×20"]},
      {day:"Saturday",workout:"Arms & Shoulders",exercises:["Lateral Raises 3×12","Front Raises 3×12","Skull Crushers 3×10","Hammer Curls 3×12"]},
      {day:"Sunday",workout:"Rest Day",exercises:["Complete rest","Light walk","Meditation"]},
    ]
  },
  Normal: {
    goal:"🏃 Fitness Maintenance Plan",
    color:"#34d399",
    days:[
      {day:"Monday",workout:"Cardio + Upper Body",exercises:["5km Run","Push-ups 3×20","Pull-ups 3×10","Dumbbell Press 3×12"]},
      {day:"Tuesday",workout:"HIIT Training",exercises:["Burpees 4×10","Jump Squats 4×15","Mountain Climbers 3×30sec","Box Jumps 3×10"]},
      {day:"Wednesday",workout:"Yoga & Flexibility",exercises:["Yoga 45 min","Deep stretching","Core breathing","Foam rolling"]},
      {day:"Thursday",workout:"Lower Body",exercises:["Squats 4×15","Hip Thrusts 3×15","Calf Raises 4×20","Wall Sit 3×45sec"]},
      {day:"Friday",workout:"Full Body Circuit",exercises:["30 min circuit training","Kettlebell swings","TRX exercises","Battle ropes"]},
      {day:"Saturday",workout:"Outdoor Activity",exercises:["Cycling / Swimming","Sports activity","Group fitness class"]},
      {day:"Sunday",workout:"Active Recovery",exercises:["Gentle yoga","Light walk","Meditation"]},
    ]
  },
  Overweight: {
    goal:"🔥 Fat Loss Plan",
    color:"#fbbf24",
    days:[
      {day:"Monday",workout:"Low Impact Cardio",exercises:["30 min brisk walk","Swimming 20 min","Cycling (easy) 20 min"]},
      {day:"Tuesday",workout:"Strength + Cardio",exercises:["Bodyweight Squats 3×15","Modified Push-ups 3×12","Resistance Band Rows 3×15","20 min elliptical"]},
      {day:"Wednesday",workout:"Walking + Core",exercises:["45 min walk","Crunches 3×15","Plank 3×30sec","Bird Dog 3×10"]},
      {day:"Thursday",workout:"LISS Cardio",exercises:["40 min low intensity walk","Stationary bike 20 min","Stretching 10 min"]},
      {day:"Friday",workout:"Full Body Light",exercises:["Goblet Squats 3×12","Seated Rows 3×15","Shoulder Press 3×12","Step-ups 3×10"]},
      {day:"Saturday",workout:"Active Lifestyle",exercises:["Hiking","Swimming","Dancing","Sports"]},
      {day:"Sunday",workout:"Rest + Stretch",exercises:["Full body stretch","Light yoga","Rest"]},
    ]
  },
  Obese: {
    goal:"💙 Gentle Start Plan",
    color:"#f87171",
    days:[
      {day:"Monday",workout:"Easy Walking",exercises:["15-20 min flat walk","Chair exercises","Deep breathing"]},
      {day:"Tuesday",workout:"Chair Exercises",exercises:["Seated leg lifts","Seated arm circles","Chair squats 2×10","Ankle rotations"]},
      {day:"Wednesday",workout:"Light Walk",exercises:["20 min walk (comfortable pace)","Standing stretches","Balance exercises"]},
      {day:"Thursday",workout:"Pool/Water Exercise",exercises:["Water walking 20 min","Water aerobics","Pool stretching"]},
      {day:"Friday",workout:"Gentle Strength",exercises:["Wall push-ups 2×10","Resistance band exercises","Seated marching"]},
      {day:"Saturday",workout:"Lifestyle Activity",exercises:["Gardening","Slow dancing","Shopping walk"]},
      {day:"Sunday",workout:"Complete Rest",exercises:["Rest fully","Light stretching if comfortable","Meditate"]},
    ]
  }
};

export default function WorkoutPlanner() {
  const [category, setCategory] = useState("Normal");
  const [aiPlan, setAiPlan] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const plan = PLANS[category];

  const getAIPlan = async () => {
    setAiLoading(true);
    try {
      const res = await axios.post(`${API_BASE}/api/ai/advice`, { bmi: 26, category });
      setAiPlan(res.data.advice);
    } catch(e) { setAiPlan("Could not load AI plan. Please ensure backend is running."); }
    setAiLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
        <h2 className="text-2xl font-black mb-2">🏋️ Workout Planner</h2>
        <p className="text-slate-400 text-sm mb-6">Select your BMI category to get a personalized 7-day workout plan.</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {Object.keys(PLANS).map(cat=>(
            <button key={cat} onClick={()=>setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border ${
                category===cat?"border-emerald-500/50 bg-emerald-500/15 text-emerald-300":"border-white/[0.08] bg-white/[0.04] text-slate-400 hover:bg-white/10"}`}>
              {cat}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl mb-4" style={{background:`${plan.color}10`,border:`1px solid ${plan.color}30`}}>
          <span className="font-bold text-lg" style={{color:plan.color}}>{plan.goal}</span>
        </div>

        {/* 7-Day Grid */}
        <div className="grid gap-3">
          {plan.days.map((d,i)=>(
            <motion.div key={i} initial={{opacity:0,x:-12}} animate={{opacity:1,x:0}} transition={{delay:i*0.06}}
              className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-bold text-white text-sm">{d.day}</span>
                <span className="text-xs px-2 py-1 rounded-full bg-white/[0.08] text-slate-400">{d.workout}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {d.exercises.map((ex,j)=>(
                  <span key={j} className="text-xs px-2.5 py-1 rounded-full bg-white/[0.06] text-slate-300 border border-white/[0.06]">{ex}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <button onClick={getAIPlan} disabled={aiLoading}
          className="w-full mt-5 bg-gradient-to-r from-violet-500 to-purple-600 py-3.5 rounded-xl font-bold hover:shadow-xl hover:shadow-violet-500/25 hover:scale-[1.02] transition-all disabled:opacity-50">
          {aiLoading?"🤖 Generating AI Plan...":"🤖 Get AI Personalized Plan"}
        </button>
      </div>

      <AnimatePresence>
        {aiPlan && (
          <motion.div initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            className="bg-violet-500/5 border border-violet-500/20 rounded-2xl p-6">
            <h3 className="text-violet-400 font-bold text-lg mb-3 flex items-center gap-2">🤖 AI Personalized Plan</h3>
            <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-line">{aiPlan}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}