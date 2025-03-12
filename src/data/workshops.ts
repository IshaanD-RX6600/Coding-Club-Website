export interface Workshop {
  title: string;
  link: string;
  description?: string;
  type: 'presentation' | 'activity';
}

export interface Week {
  number: number;
  workshops: Workshop[];
}

export const weeks: Week[] = [
  {
    number: 1,
    workshops: [
      {
        title: "Introduction to Programming",
        link: "https://docs.google.com/presentation/d/1fTN4kQ1w2QSys2OhXuQMKjTmjTFaV3LcRex5Ty7Jd9w/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Variables and Data Types",
        link: "https://docs.google.com/presentation/d/1LVpdKc5BLzVz2zckPsclxBmTXIBnVW29Jf2V9ryEL-M/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 2,
    workshops: [
      {
        title: "Control Flow",
        link: "https://docs.google.com/presentation/d/1rp1hmci28iHTQUYlCoXuJdOePbKdu6dHtjdxc_UCE90/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Functions and Methods",
        link: "https://docs.google.com/presentation/d/1e4Lmfo96eRFtsDAHkCCJtnIW9nPba8Enf94wgSbilXc/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 3,
    workshops: [
      {
        title: "Arrays and Lists",
        link: "https://docs.google.com/presentation/d/1tHLpSPL3_SADNBzL9LI0oSneTG1LyyjzlZsUlpbF-Wo/edit",
        type: "presentation"
      },
      {
        title: "Object-Oriented Programming",
        link: "https://docs.google.com/presentation/d/17lZtaKRQSJGb4FVNtxMMe2pEQ3aUYr12YGEW7Ptn9rs/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 4,
    workshops: [
      {
        title: "Algorithms Basics",
        link: "https://docs.google.com/presentation/d/1yEWom2O02Cz2tYim_Dj3ITPC4lEAyokdKBHWIhpRORk/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Sorting Algorithms",
        link: "https://docs.google.com/presentation/d/17w2NcIim65-DtHvbxoeFamjPlvMer_pkR3tOAUiz7Uo/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 5,
    workshops: [
      {
        title: "Data Structures",
        link: "https://docs.google.com/presentation/d/1WIiY49gLZWLhl1fz2_UwItWAUVaAulZvFTyGwRojQgY/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Advanced Data Structures",
        link: "https://docs.google.com/presentation/d/1BFwSqZMN_Eh0CKrphMT2yvaie-d-TMIPdd2TJnYlt_8/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 6,
    workshops: [
      {
        title: "Problem Solving Strategies",
        link: "https://docs.google.com/presentation/d/1sQy20FHJ7l5vOROKPA4d78yg6XWROz_27DpESkBLhVY/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Prisoner's Dilemma Tournament",
        link: "#",
        description: "Create a C++ function for the Iterated Prisoner's Dilemma tournament. Your strategy will compete against others in a tournament format.",
        type: "activity"
      }
    ]
  },
  {
    number: 7,
    workshops: [
      {
        title: "Dynamic Programming",
        link: "https://docs.google.com/presentation/d/1ENdAr43sDuiaTIAD9ldETmMeqf1pWdHA0ovsLjV99X0/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Graph Theory",
        link: "https://docs.google.com/presentation/d/1W1ugq9rMZDygLA3h2dudjJSCCt213IvEcm7zb298wCY/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 8,
    workshops: [
      {
        title: "Advanced Algorithms",
        link: "https://docs.google.com/presentation/d/1MvgmvSD9RdgHVyDI5vkzAwbxthsbjyR57pNjbgD9L1o/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Competitive Programming",
        link: "https://docs.google.com/presentation/d/1jTgiFg8xHZaJWPNXMt635aay1lgFU9vaS_zzPtuKOzc/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 9,
    workshops: [
      {
        title: "Web Development Basics",
        link: "https://docs.google.com/presentation/d/1Spvq7fYFXlAwBJMTOJQwHI7Zn9apoTeSU2EQAlu7cQU/edit#slide=id.g754534f808_1_198",
        type: "presentation"
      },
      {
        title: "Frontend Development",
        link: "https://docs.google.com/presentation/d/1E2d9VXqYHrcB964f7AfGx8yLDb3tI5dgOexdMrYsENk/edit#slide=id.p",
        type: "presentation"
      }
    ]
  },
  {
    number: 10,
    workshops: [
      {
        title: "Final Project Workshop",
        link: "https://docs.google.com/presentation/d/1vaiM8JNKL7-rr4AOJPcL5zlC79FRqdnAEl1lON637us/edit#slide=id.p",
        type: "presentation"
      },
      {
        title: "Project Results",
        link: "https://drive.google.com/file/d/1-hc7JKZjjedjGljIDribEKp2uY0BKAZ0/view",
        type: "presentation"
      }
    ]
  }
]; 