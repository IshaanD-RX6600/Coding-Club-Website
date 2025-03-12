export interface Problem {
  title: string;
  link: string;
  points: number;
  code: string;
}

export interface Week {
  number: number;
  problems: Problem[];
  description?: string;
}

export const weeks: Week[] = [
  {
    number: 1,
    description: "In order to prepare for the CCC (Canadian Computing Competition) in February, I will be posting past problems from the CCC every week. The next week at the club meeting, I will take up these problems in a Q&A session.",
    problems: [
      {
        title: "ISBN",
        code: "ccc09j1",
        link: "https://dmoj.ca/problem/ccc09j1",
        points: 3
      },
      {
        title: "Pi-day",
        code: "ccc15j5",
        link: "https://dmoj.ca/problem/ccc15j5",
        points: 8
      },
      {
        title: "Alice Through the Looking Glass",
        code: "ccc11s3",
        link: "https://dmoj.ca/problem/ccc11s3",
        points: 9
      }
    ]
  },
  {
    number: 2,
    problems: [
      {
        title: "Terms of Office",
        code: "ccc04j2",
        link: "https://dmoj.ca/problem/ccc04j2",
        points: 4
      },
      {
        title: "Knight Hop",
        code: "ccc10j5",
        link: "https://dmoj.ca/problem/ccc10j5",
        points: 7
      },
      {
        title: "Gates",
        code: "ccc15s3",
        link: "https://dmoj.ca/problem/ccc15s3",
        points: 9
      }
    ]
  },
  {
    number: 3,
    problems: [
      {
        title: "Mod Inverse",
        code: "ccc01j2",
        link: "https://dmoj.ca/problem/ccc01j2",
        points: 4
      },
      {
        title: "English or French",
        code: "ccc11s1",
        link: "https://dmoj.ca/problem/ccc11s1",
        points: 6
      },
      {
        title: "Phonomenal Reviews",
        code: "ccc16s3",
        link: "https://dmoj.ca/problem/ccc16s3",
        points: 10
      }
    ]
  },
  {
    number: 4,
    problems: [
      {
        title: "Weather Balloon",
        code: "ccc11j2",
        link: "https://dmoj.ca/problem/ccc11j2",
        points: 4
      },
      {
        title: "Choose Your Own Adventure",
        code: "ccc18j5",
        link: "https://dmoj.ca/problem/ccc18j5",
        points: 7
      },
      {
        title: "Waterpark",
        code: "ccc07s4",
        link: "https://dmoj.ca/problem/ccc07s4",
        points: 9
      }
    ]
  },
  {
    number: 5,
    problems: [
      {
        title: "Punchy",
        code: "ccc10j3",
        link: "https://dmoj.ca/problem/ccc10j3",
        points: 5
      },
      {
        title: "From Prefix to Postfix",
        code: "ccc08j4",
        link: "https://dmoj.ca/problem/ccc08j4",
        points: 7
      },
      {
        title: "Arithmetic Square",
        code: "ccc19s3",
        link: "https://dmoj.ca/problem/ccc19s3",
        points: 8
      }
    ]
  }
]; 