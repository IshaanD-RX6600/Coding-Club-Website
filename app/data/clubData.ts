export const clubData = {
  clubExecs: [
    { name: "Russell Morland", grade: 12 },
    { name: "Raymon Drost", grade: 12 },
    { name: "Jeevithan Muhunthan", grade: 10 },
    { name: "Kevin Chang", grade: 10 }
  ],
  discordLink: "https://discord.gg/hgQWvpYm",
  meetingSchedule: "Every Thursday",
  workshops: [
    {
      week: 1,
      links: [
        "https://docs.google.com/presentation/d/1fTN4kQ1w2QSys2OhXuQMKjTmjTFaV3LcRex5Ty7Jd9w/edit#slide=id.p",
        "https://docs.google.com/presentation/d/1LVpdKc5BLzVz2zckPsclxBmTXIBnVW29Jf2V9ryEL-M/edit#slide=id.p",
        "https://docs.google.com/presentation/d/1rp1hmci28iHTQUYlCoXuJdOePbKdu6dHtjdxc_UCE90/edit#slide=id.p"
      ]
    },
    // Add more workshop weeks here...
  ],
  challenges: {
    prisonersDilemma: {
      title: "Iterated Prisoner's Dilemma Tournament",
      description: `Create a function in C++ with the following structure:
int functionName(int lastMove, int roundNumber, vector<int> P1LastMoves, vector<int> P2LastMoves) {
    // your code here
    return 0; // zero represents staying quiet, and 1 represents speaking up.
}`,
      rules: "Your strategy will face off against every other strategy, and the one with the least total points at the end wins."
    },
    weeklyProblems: [
      {
        week: 1,
        problems: [
          { title: "ISBN", points: 3, link: "https://dmoj.ca/problem/ccc09j1" },
          { title: "Pi-day", points: 8, link: "https://dmoj.ca/problem/ccc15j5" },
          { title: "Alice Through the Looking Glass", points: 9, link: "https://dmoj.ca/problem/ccc11s3" }
        ]
      },
      // Add more weekly problems here...
    ]
  }
}; 