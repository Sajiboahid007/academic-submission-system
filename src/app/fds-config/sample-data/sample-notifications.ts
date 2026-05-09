import { NotificationApiDto } from '../entity-models/notification';

/**
 * Example rows for `data.Result` from GET notifications.
 * Use for mocks, tests, or backend contract reference.
 *
 * Full envelope example:
 * `{ "message": "ok", "data": { "Result": SAMPLE_NOTIFICATION_RESULT }, "error": "" }`
 */
export const SAMPLE_NOTIFICATION_RESULT: NotificationApiDto[] = [
  {
    Id: '1',
    Title: 'Thesis paper approved',
    Message:
      'Your thesis "Industrial Robotics: Safety Analysis" has been approved. You may proceed to final submission.',
    Status: 'Approved',
    CreatedAt: '2026-05-08T14:30:00',
  },
  {
    Id: '2',
    Title: 'Robotics analysis accepted',
    Message:
      'The review panel accepted your chapter "Robotics Analysis: Motion Planning" with no further changes required.',
    Status: 'Accepted',
    CreatedAt: '2026-05-07T09:15:00',
  },
  {
    Id: '3',
    Title: 'Robotics analysis rejected',
    Message:
      'Your submission "Robotics Analysis: Sensor Fusion" was rejected. Please revise methodology (Section 3) and resubmit.',
    Status: 'Rejected',
    CreatedAt: '2026-05-06T16:45:00',
  },
  {
    Id: '4',
    Title: 'Thesis review on hold',
    Message:
      'Your paper "Applied ML for Robotic Perception" is on hold pending additional supervisor sign-off.',
    Status: 'OnHold',
    CreatedAt: '2026-05-05T11:00:00',
  },
];
