import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // ============================================
  // DRILLS (12 total: 4 categories × 3 drills)
  // ============================================

  const drills = [
    // Ball Mastery (3)
    {
      name: 'Toe Taps',
      category: 'Ball Mastery',
      description: 'Tap the top of the ball alternating feet as quickly as possible. Keep the ball stationary and stay on your toes.',
      duration: 2,
      reps: null,
      coachTip: 'Stay light on your feet and keep your eyes up, not on the ball!',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },
    {
      name: 'Inside-Outside Touches',
      category: 'Ball Mastery',
      description: 'Use the inside then outside of the same foot to touch the ball side-to-side. Switch feet every 10 touches.',
      duration: 3,
      reps: null,
      coachTip: 'Keep the ball close and use both feet equally. Build rhythm!',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },
    {
      name: 'Sole Rolls',
      category: 'Ball Mastery',
      description: 'Roll the ball side-to-side using the sole (bottom) of your foot. Keep it under control.',
      duration: 2,
      reps: null,
      coachTip: 'Use your whole sole, not just your toes. Feel the ball under your foot.',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },

    // Passing (3)
    {
      name: 'Wall Passes',
      category: 'Passing',
      description: 'Pass the ball against a wall and receive it back with your first touch. Alternate feet.',
      duration: 3,
      reps: null,
      coachTip: 'Focus on a clean first touch to control the ball before passing again.',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },
    {
      name: 'Triangle Passing',
      category: 'Passing',
      description: 'Set up 3 cones in a triangle (5-10 yards apart). Pass the ball around the triangle using one or two touches.',
      duration: 5,
      reps: null,
      coachTip: 'Pass with the inside of your foot for accuracy. Receive with an open body.',
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
    },
    {
      name: 'Long Pass Practice',
      category: 'Passing',
      description: 'Hit passes 15-20 yards to a target (cone or spot). Focus on striking through the center of the ball.',
      duration: 4,
      reps: 20,
      coachTip: 'Use your laces and follow through. Keep your head down on contact.',
      difficulty: 'Intermediate',
      ageMin: 12,
      ageMax: 18,
    },

    // Finishing (3)
    {
      name: 'Cone Gate Shooting',
      category: 'Finishing',
      description: 'Set up 2 cones as a goal. Dribble up and shoot through the gate from 10-15 yards.',
      duration: 5,
      reps: 10,
      coachTip: 'Pick your target (left or right cone) before you shoot. Strike with power and accuracy.',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },
    {
      name: 'First-Time Finishing',
      category: 'Finishing',
      description: 'Toss the ball ahead of you, let it bounce once, then shoot on the half-volley. Repeat 10 times.',
      duration: 4,
      reps: 10,
      coachTip: 'Time your run so you meet the ball at the perfect moment. Strike through it!',
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
    },
    {
      name: 'Weak Foot Finishing',
      category: 'Finishing',
      description: 'Use ONLY your weak foot to shoot at a target. Focus on technique over power.',
      duration: 5,
      reps: 15,
      coachTip: 'Your weak foot will never improve if you don\'t practice it. Embrace the challenge!',
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
    },

    // Speed/Agility (3)
    {
      name: 'Cone Weave Sprint',
      category: 'Speed/Agility',
      description: 'Set up 6 cones in a line (3 yards apart). Weave through them as fast as possible, then sprint back.',
      duration: 3,
      reps: 5,
      coachTip: 'Stay low and push off hard with each cut. Use your arms for balance!',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },
    {
      name: 'Ladder Drills (Imaginary or Real)',
      category: 'Speed/Agility',
      description: 'If you have an agility ladder, use it. If not, imagine squares on the ground and do quick feet patterns: two-in, two-out.',
      duration: 4,
      reps: null,
      coachTip: 'Speed comes from quick ground contact. Don\'t jump—just tap and go!',
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
    },
    {
      name: 'Shuttle Runs',
      category: 'Speed/Agility',
      description: 'Sprint 10 yards, touch the ground, sprint back. Repeat 5 times as fast as possible.',
      duration: 3,
      reps: 5,
      coachTip: 'Explode out of your turns. This builds game-speed endurance!',
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
    },
  ]

  for (const drill of drills) {
    await prisma.drill.create({ data: drill })
  }

  console.log(`✅ Created ${drills.length} drills`)

  // ============================================
  // LESSONS (6 total with quizzes)
  // ============================================

  const lessons = [
    {
      title: 'First Touch Basics',
      category: 'Technical',
      content: `Your first touch is the most important moment in soccer. It's the split second when you receive the ball and decide what to do next.

**Why it matters:** A good first touch gives you time and space. A bad one means you're chasing the ball or losing possession.

**Key principles:**
1. **Scan before the ball arrives:** Look around before you receive the pass. Know where defenders and teammates are.
2. **Receive with an open body:** Turn your hips so you can see the field. Don't face the passer—face where you want to go next.
3. **Cushion the ball:** Use a soft touch to control the ball. Let your foot "give" slightly on contact.
4. **Touch it into space:** Don't just stop the ball at your feet. Push it 1-2 yards into space where you can make your next move.

**Practice tip:** Against a wall, pass the ball and focus on receiving it with one touch, then immediately passing again. Make your first touch move the ball where you want it.`,
      readingTime: 3,
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
      quizQuestions: JSON.stringify([
        {
          question: 'When should you scan (look around) the field?',
          options: [
            'Before the ball arrives',
            'After you receive the ball',
            'Only when a coach tells you to',
          ],
          correctIndex: 0,
          explanation: 'Scanning before the ball arrives lets you make faster decisions once you receive it.',
        },
        {
          question: 'What does "open body" mean when receiving?',
          options: [
            'Face the passer directly',
            'Turn your hips to see the field',
            'Keep your back to the goal',
          ],
          correctIndex: 1,
          explanation: 'An open body position lets you see more of the field and make better decisions.',
        },
        {
          question: 'Why should you touch the ball into space (not just stop it)?',
          options: [
            'To show off your skills',
            'To set up your next move',
            'Because coaches said so',
          ],
          correctIndex: 1,
          explanation: 'Touching into space prepares you for your next action—pass, dribble, or shoot.',
        },
      ]),
    },
    {
      title: 'Scanning and Awareness',
      category: 'Tactical',
      content: `The best players always know what's happening around them. They scan constantly—even when they don't have the ball.

**What is scanning?** Quickly looking around to see: where teammates are, where defenders are, and where open space is.

**When to scan:**
- Before you receive the ball (most important!)
- While dribbling (quick glances)
- After you pass (to see what happens next)

**How to scan effectively:**
1. **Turn your head, not just your eyes.** A quick head check gives you a wider view.
2. **Scan early and often.** Don't wait until the ball is at your feet.
3. **Remember what you see.** Build a mental picture so you don't have to look again immediately.

**Why it matters:** If you don't scan, you'll always be reacting. If you scan, you'll be one step ahead—knowing where to pass before the ball even arrives.

**Practice tip:** In your next training session or game, count how many times you scan before receiving the ball. Try to beat your record each time.`,
      readingTime: 3,
      difficulty: 'Beginner',
      ageMin: 10,
      ageMax: 18,
      quizQuestions: JSON.stringify([
        {
          question: 'When is the MOST important time to scan?',
          options: [
            'After you receive the ball',
            'Before you receive the ball',
            'Only when your coach yells at you',
          ],
          correctIndex: 1,
          explanation: 'Scanning before receiving the ball lets you make instant decisions when it arrives.',
        },
        {
          question: 'What should you do when you scan?',
          options: [
            'Only move your eyes',
            'Turn your whole head',
            'Stare at the ball',
          ],
          correctIndex: 1,
          explanation: 'Turning your head gives you a wider field of view than just moving your eyes.',
        },
        {
          question: 'Why is scanning important?',
          options: [
            'To impress your teammates',
            'To see where defenders and teammates are',
            'Because it looks cool',
          ],
          correctIndex: 1,
          explanation: 'Scanning gives you awareness of the field so you can make better decisions.',
        },
      ]),
    },
    {
      title: 'Weak Foot Development',
      category: 'Technical',
      content: `Your weak foot is your secret weapon—if you train it. Most players avoid their weak foot, which makes them predictable.

**Why develop your weak foot?**
- You'll have twice as many passing options
- Defenders can't force you to one side
- You'll be more confident in tight spaces

**How to train it:**
1. **Start simple:** Use your weak foot for every pass in warm-up.
2. **Make it a rule:** For one week, use ONLY your weak foot in drills. It'll feel awkward—that's the point.
3. **Match the strong foot:** Whatever you can do with your strong foot (dribble, pass, shoot), practice it with your weak foot.

**Mindset shift:** Don't call it your "weak" foot. Call it your "other" foot or "developing" foot. Language matters!

**Real talk:** Your weak foot will feel terrible at first. That's normal. The best players pushed through that discomfort and now have two strong feet.

**Challenge:** This week, take 10 shots with ONLY your weak foot. Track your progress. By week 4, you'll surprise yourself.`,
      readingTime: 2,
      difficulty: 'Beginner',
      ageMin: 8,
      ageMax: 18,
      quizQuestions: JSON.stringify([
        {
          question: 'What is one benefit of developing your weak foot?',
          options: [
            'It looks impressive',
            'Defenders can\'t force you to one side',
            'You can play fewer games',
          ],
          correctIndex: 1,
          explanation: 'With two strong feet, you become unpredictable and harder to defend.',
        },
        {
          question: 'How should you approach weak foot training?',
          options: [
            'Only use it when it feels comfortable',
            'Practice it even when it feels awkward',
            'Avoid it in games',
          ],
          correctIndex: 1,
          explanation: 'Discomfort means you\'re learning. Push through it to improve.',
        },
        {
          question: 'What\'s a good mindset for your weak foot?',
          options: [
            'Call it your "weak" foot to stay realistic',
            'Call it your "developing" or "other" foot',
            'Ignore it completely',
          ],
          correctIndex: 1,
          explanation: 'Positive language helps build confidence. It\'s not weak—it\'s developing!',
        },
      ]),
    },
    {
      title: 'Playing Under Pressure',
      category: 'Tactical',
      content: `Pressure is when a defender is close to you, trying to win the ball. How you handle pressure separates good players from great ones.

**What to do when pressured:**

**1. Stay calm.** Panicking leads to bad touches and turnovers. Take a breath.

**2. Shield the ball.** Put your body between the defender and the ball. Use your arm (not pushing, just for balance) to feel where they are.

**3. Know your options BEFORE the ball arrives.** (This is why scanning matters!)

**4. Use quick touches.** Small, controlled touches keep the ball close and give you more control.

**5. Don't force it.** If there's no forward pass, play it back or sideways. Keeping possession is better than losing the ball.

**When to dribble vs. pass under pressure:**
- **Dribble:** If you have space behind the defender or they're off-balance
- **Pass:** If a teammate is open and in a better position

**Practice tip:** Ask a friend or parent to lightly pressure you while you dribble. Get used to feeling someone close without panicking.`,
      readingTime: 3,
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
      quizQuestions: JSON.stringify([
        {
          question: 'What should you do FIRST when under pressure?',
          options: [
            'Kick the ball away',
            'Stay calm and shield the ball',
            'Pass immediately without looking',
          ],
          correctIndex: 1,
          explanation: 'Staying calm and shielding the ball gives you time to make a good decision.',
        },
        {
          question: 'When should you pass backward under pressure?',
          options: [
            'Never—always go forward',
            'When there\'s no good forward option',
            'Only when the coach tells you',
          ],
          correctIndex: 1,
          explanation: 'Keeping possession is better than forcing a risky pass and losing the ball.',
        },
        {
          question: 'Why are quick, small touches useful under pressure?',
          options: [
            'They look cooler',
            'They give you more control',
            'They tire out the defender',
          ],
          correctIndex: 1,
          explanation: 'Small touches keep the ball close, making it harder for defenders to steal.',
        },
      ]),
    },
    {
      title: 'Finishing with Composure',
      category: 'Technical',
      content: `You've beaten the defender, you're in front of goal—and you blast it over the bar. Sound familiar?

**Why players miss:** Rushing, poor technique, or trying to hit it too hard.

**Keys to composure in front of goal:**

**1. Pick your spot early.** As you approach, decide: near post, far post, or low center. Don't wait until the last second.

**2. Keep your head down.** Look at the ball as you strike it. Lifting your head early = lifting the ball over the goal.

**3. Strike through the center of the ball.** For low shots, hit the middle or just above center. For power, use your laces.

**4. Follow through.** Your kicking leg should finish high and toward your target.

**5. Stay balanced.** Plant your non-kicking foot next to the ball (not too far ahead or behind).

**Mindset tip:** Treat every shot in training like a game-winner. If you practice casually, you'll play casually. If you practice with intention, you'll finish with confidence.

**Drill idea:** Set up 2 cones as a goal. Take 10 shots, focusing on placement over power. Count how many go between the cones. Try to improve your score each session.`,
      readingTime: 3,
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
      quizQuestions: JSON.stringify([
        {
          question: 'When should you pick your target when shooting?',
          options: [
            'Right as you strike the ball',
            'Early, as you approach the goal',
            'After you shoot',
          ],
          correctIndex: 1,
          explanation: 'Deciding early gives you a clear plan and reduces rushed decisions.',
        },
        {
          question: 'What often causes players to shoot over the goal?',
          options: [
            'Striking the ball too softly',
            'Lifting their head too early',
            'Using their weak foot',
          ],
          correctIndex: 1,
          explanation: 'Lifting your head before contact usually lifts the ball. Keep your head down!',
        },
        {
          question: 'What should you prioritize in finishing practice?',
          options: [
            'Power over placement',
            'Placement over power',
            'Trick shots',
          ],
          correctIndex: 1,
          explanation: 'A well-placed shot beats a powerful but wild one every time.',
        },
      ]),
    },
    {
      title: '1v1 Defending Basics',
      category: 'Tactical',
      content: `Defending 1v1 is an art. Your job: slow the attacker down, force them into a mistake, or win the ball cleanly.

**The Golden Rule: Don't dive in.**
Lunging at the ball (diving in) usually means the attacker dribbles past you. Be patient.

**Step-by-step 1v1 defending:**

**1. Get goal-side.** Position yourself between the attacker and the goal. Never let them get behind you.

**2. Stay on your toes.** Be ready to move in any direction. Flat feet = easy to beat.

**3. Show them one way.** Force the attacker to their weak side or toward the sideline (away from goal).

**4. Jockey (shuffle).** Move sideways with small, quick steps. Mirror the attacker's movements.

**5. Wait for the mistake.** Attackers make errors: a heavy touch, looking down, or slowing down. THAT's when you win the ball.

**When to tackle:**
- When the ball is far from their feet
- When they're off-balance
- When they're not looking at you

**Mindset:** Think of defending as a chess game. You're not trying to "win the ball immediately"—you're trying to control the situation until the right moment.

**Drill:** Have a friend dribble at you slowly. Practice jockeying (staying in front of them) without diving in. Once you master slow speed, increase the tempo.`,
      readingTime: 3,
      difficulty: 'Intermediate',
      ageMin: 10,
      ageMax: 18,
      quizQuestions: JSON.stringify([
        {
          question: 'What is the golden rule of 1v1 defending?',
          options: [
            'Always dive in for the ball',
            'Don\'t dive in—be patient',
            'Let them shoot',
          ],
          correctIndex: 1,
          explanation: 'Diving in usually gets you beaten. Patience forces the attacker into mistakes.',
        },
        {
          question: 'What does "goal-side" mean?',
          options: [
            'Stand next to the goal',
            'Position yourself between attacker and goal',
            'Run toward your own goal',
          ],
          correctIndex: 1,
          explanation: 'Being goal-side prevents the attacker from getting a clear path to score.',
        },
        {
          question: 'When is the BEST time to tackle in 1v1?',
          options: [
            'As soon as they get the ball',
            'When the ball is far from their feet',
            'Never tackle',
          ],
          correctIndex: 1,
          explanation: 'A heavy touch or moment of imbalance is your chance to win the ball cleanly.',
        },
      ]),
    },
  ]

  for (const lesson of lessons) {
    await prisma.lesson.create({ data: lesson })
  }

  console.log(`✅ Created ${lessons.length} lessons`)

  // ============================================
  // SKILL CHALLENGES (3)
  // ============================================

  const challenges = [
    {
      name: 'Juggling',
      description: 'How many consecutive touches can you juggle the ball without it hitting the ground? Use feet, thighs, chest, and head (no hands!).',
      metric: 'touches',
    },
    {
      name: 'Wall Passes in 60 Seconds',
      description: 'Pass the ball against a wall and receive it back. How many clean passes can you complete in 60 seconds?',
      metric: 'passes',
    },
    {
      name: 'Cone Weave Speed',
      description: 'Set up 6 cones in a line (3 yards apart). Weave through them as fast as possible. Record your best time in seconds.',
      metric: 'seconds',
    },
  ]

  for (const challenge of challenges) {
    await prisma.skillChallenge.create({ data: challenge })
  }

  console.log(`✅ Created ${challenges.length} skill challenges`)

  // ============================================
  // FACILITIES (Issue #19 - Activity Logging)
  // ============================================

  const facilities = [
    {
      name: 'Touch N Go',
      city: 'Tustin',
      state: 'CA',
      country: 'US',
    },
  ]

  for (const facility of facilities) {
    await prisma.facility.create({ data: facility })
  }

  console.log(`✅ Created ${facilities.length} facilities`)

  // ============================================
  // FOCUS TAGS (Issue #19 - Activity Logging)
  // ============================================

  const focusTags = [
    // Skill tracks (new)
    { key: 'scanning', label: 'Scanning', description: 'See the field early', category: 'skill_track' },
    { key: 'decision_chain', label: 'Decision Chain', description: 'Next 1-3 moves', category: 'skill_track' },
    // General skills (existing categories)
    { key: 'ball_mastery', label: 'Ball Mastery', description: 'Ball control and close touches', category: 'general' },
    { key: 'passing', label: 'Passing', description: 'Accuracy and weight of pass', category: 'general' },
    { key: 'finishing', label: 'Finishing', description: 'Shooting and scoring', category: 'general' },
    { key: 'defending', label: 'Defending', description: '1v1 and team defense', category: 'general' },
    { key: 'speed_agility', label: 'Speed & Agility', description: 'Quick feet and movement', category: 'general' },
    { key: 'first_touch', label: 'First Touch', description: 'Receiving and controlling the ball', category: 'general' },
    { key: 'game_iq', label: 'Game IQ', description: 'Tactical understanding', category: 'general' },
    { key: 'weak_foot', label: 'Weak Foot', description: 'Developing both feet', category: 'general' },
  ]

  for (const tag of focusTags) {
    await prisma.focusTag.create({ data: tag })
  }

  console.log(`✅ Created ${focusTags.length} focus tags`)

  // ============================================
  // HIGHLIGHT CHIPS (Issue #19 - Activity Logging)
  // ============================================

  const highlightChips = [
    { key: 'created_space', label: 'Created space', icon: '🎯' },
    { key: 'won_ball_back', label: 'Won ball back', icon: '💪' },
    { key: 'scanned_early', label: 'Scanned early', icon: '👀' },
    { key: 'good_decision', label: 'Good decision', icon: '🧠' },
    { key: 'completed_passes', label: 'Completed passes', icon: '✅' },
    { key: 'scored_goal', label: 'Scored a goal', icon: '⚽' },
    { key: 'clean_tackle', label: 'Clean tackle', icon: '🛡️' },
    { key: 'kept_composure', label: 'Kept composure', icon: '😤' },
    { key: 'used_weak_foot', label: 'Used weak foot', icon: '🦶' },
    { key: 'high_intensity', label: 'High intensity', icon: '🔥' },
  ]

  for (const chip of highlightChips) {
    await prisma.highlightChip.create({ data: chip })
  }

  console.log(`✅ Created ${highlightChips.length} highlight chips`)

  // ============================================
  // NEXT FOCUS CHIPS (Issue #19 - Activity Logging)
  // ============================================

  const nextFocusChips = [
    { key: 'more_scanning', label: 'More scanning', icon: '👁️' },
    { key: 'faster_decisions', label: 'Faster decisions', icon: '⚡' },
    { key: 'better_first_touch', label: 'Better first touch', icon: '🎯' },
    { key: 'stronger_defense', label: 'Stronger defense', icon: '🛡️' },
    { key: 'shooting_accuracy', label: 'Shooting accuracy', icon: '🥅' },
    { key: 'passing_weight', label: 'Passing weight', icon: '📐' },
    { key: 'communication', label: 'Communication', icon: '📢' },
    { key: 'fitness_endurance', label: 'Fitness/Endurance', icon: '🏃' },
    { key: 'weak_foot_practice', label: 'Weak foot practice', icon: '🦶' },
    { key: 'game_awareness', label: 'Game awareness', icon: '🧠' },
  ]

  for (const chip of nextFocusChips) {
    await prisma.nextFocusChip.create({ data: chip })
  }

  console.log(`✅ Created ${nextFocusChips.length} next focus chips`)

  // ============================================
  // SKILL TRACK DRILLS (Issue #19 - Scanning + Decision Chain)
  // No First Touch duplication - these are new skill tracks only
  // ============================================

  const skillTrackDrills = [
    // SCANNING DRILLS
    {
      key: 'scanning.3point_scan',
      title: '3-Point Scan',
      track: 'scanning',
      durationMinutes: 5,
      recommendedFrequency: '2x/week',
      animationKey: 'scanning-3point',
      whyItMatters: 'Scanning buys time before your first touch.',
      coachTips: JSON.stringify([
        'Scan early. Decide before the ball arrives.',
        'Look left, right, and behind before receiving.',
        'Quick head movements—don\'t stare, snapshot!',
      ]),
      metricConfig: JSON.stringify({
        type: 'tap_counter',
        label: 'Scan reps completed',
        targetMin: 10,
        targetMax: 20,
      }),
    },
    {
      key: 'scanning.color_cue',
      title: 'Color Cue Scan',
      track: 'scanning',
      durationMinutes: 5,
      recommendedFrequency: '2x/week',
      animationKey: 'scanning-color-cue',
      whyItMatters: 'Better awareness makes every action faster.',
      coachTips: JSON.stringify([
        'Eyes first, feet second.',
        'Call out the color before you move.',
        'Build speed gradually—accuracy first!',
      ]),
      metricConfig: JSON.stringify({
        type: 'fraction',
        label: 'Correct cues',
        numeratorLabel: 'Correct',
        denominatorLabel: 'Total reps',
      }),
    },

    // DECISION CHAIN DRILLS
    {
      key: 'decision_chain.receive_decide_execute',
      title: 'Receive → Decide → Execute',
      track: 'decision_chain',
      durationMinutes: 6,
      recommendedFrequency: '2x/week',
      animationKey: 'decision-chain-rde',
      whyItMatters: 'Good players think ahead; great players act ahead.',
      coachTips: JSON.stringify([
        'Know your exit before the ball arrives.',
        'Scan → Receive → Execute in one flow.',
        'Don\'t hesitate—commit to your decision.',
      ]),
      metricConfig: JSON.stringify({
        type: 'chip_select_confidence',
        label: 'Decision chosen',
        options: ['Pass', 'Turn', 'Dribble', 'Shoot'],
        confidenceLabel: 'Confidence (1-5)',
      }),
    },
    {
      key: 'decision_chain.two_step_advantage',
      title: 'Two-Step Advantage',
      track: 'decision_chain',
      durationMinutes: 6,
      recommendedFrequency: '1x/week',
      animationKey: 'decision-chain-two-step',
      whyItMatters: 'The second action is where separation happens.',
      coachTips: JSON.stringify([
        'Beat the defender with your second move.',
        'Think: touch 1 = control, touch 2 = advantage.',
        'Visualize both moves before the ball arrives.',
      ]),
      metricConfig: JSON.stringify({
        type: 'chip_select_counter',
        label: 'Next 2 actions',
        options: ['Touch-Pass', 'Touch-Turn', 'Touch-Shoot', 'Fake-Dribble'],
        countLabel: 'Completion count',
      }),
    },
    {
      key: 'decision_chain.third_man_awareness',
      title: 'Third-Man Awareness (Intro)',
      track: 'decision_chain',
      durationMinutes: 5,
      recommendedFrequency: '1x/week',
      animationKey: 'decision-chain-third-man',
      whyItMatters: 'Movement off-ball unlocks the next play.',
      coachTips: JSON.stringify([
        'Pass, move, appear again.',
        'Always look for the "third option" player.',
        'Off-ball runs create on-ball chances.',
      ]),
      metricConfig: JSON.stringify({
        type: 'tap_yes_no',
        label: 'Recognition reps',
        countLabel: 'Reps',
        yesNoLabel: 'Found the third?',
      }),
    },
  ]

  for (const drill of skillTrackDrills) {
    await prisma.skillTrackDrill.create({ data: drill })
  }

  console.log(`✅ Created ${skillTrackDrills.length} skill track drills (Scanning + Decision Chain)`)

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
