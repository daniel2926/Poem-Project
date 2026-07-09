// Hardcoded Help / FAQ content — no AI, no backend. Edit here to change what
// the FAQ page shows.

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export const FAQS: Faq[] = [
  {
    id: 'f1',
    question: 'What time is dorm curfew?',
    answer:
      'The latest time to be back is 9:00 PM every day (Mon–Sun). Quiet hours run 10:00 PM–6:00 AM: all residents must be inside and noisy activities (laundry, cooking, cleaning, bathing) must stop.',
  },
  {
    id: 'f2',
    question: 'Do I need permission to leave campus, and how?',
    answer:
      "Yes. Before leaving campus, ask permission and inform the JIU Dormitory Staff. If you'll be back late, tell them too. On weekends you may leave after Friday work duty, once permission is granted.",
  },
  {
    id: 'f3',
    question: 'How do merit and demerit points work?',
    answer:
      "You start each semester with 25 merit points (reset each semester). Demerits reduce your merit. You get a warning letter at every 10 demerits. Use up all 25 before the semester ends and you'll be expelled.",
  },
  {
    id: 'f4',
    question: 'When is cleaning / work duty?',
    answer:
      'Work duty is mandatory every Friday — do your part after dinner, finishing by 8:00 PM. Always clean shared facilities after use.',
  },
  {
    id: 'f5',
    question: 'What do I do before leaving the dorm in the morning?',
    answer:
      'By 9:00 AM, hand your key to the Dormitory Office and switch off electrical appliances. You may return after lunch to rest or study.',
  },
];
