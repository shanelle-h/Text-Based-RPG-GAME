// File: task_component.js

import {entity} from "./entity.js";

export const task_component = (() => {

  const _TITLE = 'Welcome Adventurer!';
  const _TEXT = `In the village of Grimhollow, nestled at the edge of the Enchanted Forest, a dark and ominous portal has opened, unleashing a horde of menacing monsters upon the unsuspecting townsfolk. The terrified villagers seek a brave adventurer to delve into the heart of the Enchanted Forest, close the portal, and eliminate the monstrous threat.`;

  // Define the quest object
  const killMonstersQuest = {
    targetMonsterCount: 10,  // Number of monsters to kill
    currentProgress: 0,      // Current progress (number of monsters killed)
    isQuestComplete: false,  // Flag to track quest completion
  };

  // Function to initialize the quest
  function initializeQuest() {
    killMonstersQuest.currentProgress = 0;
    killMonstersQuest.isQuestComplete = false;
    console.log('Quest initialized: Kill 10 monsters!');
  }

  class QuestComponent extends entity.Component {
    constructor() {
      super();

      const e = document.getElementById('task-ui');
      e.style.visibility = 'hidden';
    }

    InitComponent() {
      this._RegisterHandler('input.picked', (m) => this._OnPicked(m));
    }

    _OnPicked(msg) {
      // Simulate an NPC conversation
      const npcDialogue = "Greetings, brave adventurer! The village is in peril, and we need your help. A dark portal in the Enchanted Forest has unleashed monsters upon us. Will you embark on a quest to vanquish these creatures and save our village?";
      
      // Assuming the player agrees to the quest
      const playerResponse = confirm(npcDialogue);
      
      if (playerResponse) {
        // The conversation triggers the quest
        initializeQuest();

        // HARDCODE A QUEST
        class Quest {
          constructor(name, targetCount) {
            this.name = name;
            this.targetCount = targetCount;
            this.currentCount = 0;
            this.isQuestComplete = false;
          
          }
        
          incrementCount() {
            this.currentCount += 1;
            if (this.currentCount >= this.targetCount) {
              this.isQuestComplete = true;
            }
          }
        }
        const quest = {
          id: 'killMonsters',
          title: _TITLE,
          text: _TEXT,
        };

        this._AddQuestToJournal(quest);

        eventEmitter.emit('quest.start', { questId: 'killMonsters' });
      }
    }

    _AddQuestToJournal(quest) {
      const ui = this.FindEntity('ui').GetComponent('UIController');
      ui.AddQuest(quest);
    }
  };

  return {
      QuestComponent: QuestComponent,
  };
})();
