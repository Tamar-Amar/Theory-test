/** מזהה סקר נוכחי — שינוי הערך יציג שוב את הפופאפ למשתמשים שכבר ענו */
export const UX_FEEDBACK_SURVEY_ID = "ux-v1";

export function needsUxFeedback(surveyId: string | null | undefined): boolean {
  return surveyId !== UX_FEEDBACK_SURVEY_ID;
}
