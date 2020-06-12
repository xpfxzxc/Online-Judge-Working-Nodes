export interface JudgementResult {
  status:
    | 'Accepted'
    | 'Wrong Answer'
    | 'Time Limit Exceeded'
    | 'Memory Limit Exceeded'
    | 'Memory Limit Exceeded'
    | 'Output Limit Exceeded'
    | 'Runtime Error'
    | 'System Error'
    | 'Unknown Error';
  score: number;
  timeUsage: number;
  memoryUsage: number;
  testPoints: [
    {
      status:
        | 'Accepted'
        | 'Wrong Answer'
        | 'Time Limit Exceeded'
        | 'Memory Limit Exceeded'
        | 'Memory Limit Exceeded'
        | 'Output Limit Exceeded'
        | 'Runtime Error';
      score: number;
      timeUsage: number;
      memoryUsage: number;
    },
  ];
}
