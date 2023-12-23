const getRandomvalue = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const app = Vue.createApp({
  data() {
    return {
      playerHealth: 100,
      monsterHealth: 100,
      roundSpecial: 0,
      roundHeal: 0,
      winner: null,
      messages: [],
    };
  },
  watch: {
    playerHealth(value) {
      if (value <= 0 && this.monsterHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "monster";
      }
    },
    monsterHealth(value) {
      if (value <= 0 && this.playerHealth <= 0) {
        this.winner = "draw";
      } else if (value <= 0) {
        this.winner = "player";
      }
    },
  },
  computed: {
    monsterBarStyles() {
      if (this.monsterHealth <= 0) {
        return { width: "0" + "%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth <= 0) {
        return { width: "0" + "%" };
      }
      return { width: this.playerHealth + "%" };
    },
    canUseSpecial() {
      return this.roundSpecial % 4 !== 0;
    },
    canHeal() {
      return this.roundHeal % 3 !== 0;
    },
  },
  methods: {
    startGame() {
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.roundSpecial = 0;
      this.roundHeal = 0;
      this.winner = null;
      this.messages = [];
      // monsterBarStyles();
      // playerBarStyles();
    },
    attackMonster() {
      this.roundHeal++;
      this.roundSpecial++;
      const attackValue = getRandomvalue(5, 20);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "attack", attackValue);
      this.attackPlayer();
    },
    attackPlayer() {
      const attackValue = getRandomvalue(10, 23);
      this.playerHealth -= attackValue;
      this.addLogMessage("monster", "attack", attackValue);
    },
    specialAttackMonster() {
      this.roundSpecial++;
      const attackValue = getRandomvalue(15, 30);
      this.monsterHealth -= attackValue;
      this.addLogMessage("player", "special attack", attackValue);
      this.attackPlayer();
    },
    healPlayer() {
      this.roundHeal++;
      const heal = getRandomvalue(10, 23);
      if (heal + this.playerHealth > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth += heal;
      }
      this.addLogMessage("player", "heal", heal);
    },
    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      this.messages.unshift({
        who: who,
        what: what,
        value: value,
      });
    },
  },
});

app.mount("#game");
