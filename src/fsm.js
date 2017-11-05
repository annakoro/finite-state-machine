class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var state, event, i = 0;
        this.state = config.initial;
        var history = [];
        history[i] = 'normal';
        i++;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (state != 'normal' && state != 'busy' && state != 'sleeping' && state != 'hungry')
            throw new Error('no such state');
        this.state = state;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        switch (event) {
            case 'study':
                this.state = 'busy';
                break;
            case 'get_tired':
                this.state = 'sleeping';
                break;
            case 'eat':
            case 'get_up':
                this.state = 'normal';
                break;
            case 'get_hungry':
                this.state = 'hungry';
                break;
        }
        //  this.history[this.i] = this.state;
        //         this.i++;       
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = 'normal';
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        switch (event) {
            case 'study':
                return ['normal'];
                break;
            case 'get_tired':
                return ['busy'];
                break;
            case 'eat':
                return ['hungry'];
                break;
            case 'get_up':
                return ['sleeping'];
                break;
            case 'get_hungry':
                return ['busy', 'sleeping'];
                break;
            default:
                return ['normal', 'busy', 'hungry', 'sleeping'];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */

    undo() {
        if (this.history[1] == undefined) return false;
        else return this.history[this.i - 1];
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() { }

    /**
     * Clears transition history
     */
    clearHistory() { }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
