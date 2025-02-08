interface MoodEntry {
  id: string;
  timestamp: Date;
  moodScore: number;
  emotions: string[];
  activities: string[];
  notes: string;
  tags?: string[];
}

interface MoodAnalytics {
  dailyAverage: number;
  weeklyTrend: number[];
  commonEmotions: { emotion: string; count: number }[];
  activityImpact: { activity: string; impact: number }[];
}

interface AIRecommendation {
  type: 'activity' | 'mood_booster' | 'resource';
  title: string;
  description: string;
  priority: number;
  tags: string[];
}