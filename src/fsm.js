class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var state, event;
        this.state = config.initial;

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
        var fsmHistory = new Array();
        fsmHistory.push('normal');
        if (event == 'study' && this.state == 'normal') {
            this.state = 'busy';
            fsmHistory.push('normal');
            //this.fsmHistory.prototype.push('busy');     
        } else if (event == 'get_tired' && this.state == 'busy') {
            this.state = 'sleeping';
        } else if (event == 'eat' && this.state == 'hungry') {
            this.state = 'normal';
        } else if (event == 'get_up' && this.state == 'sleeping') {
            this.state = 'normal';
        } else if (event == 'get_hungry' && this.state == 'busy') {
            this.state = 'hungry';
        } else if (event == 'get_hungry' && this.state == 'sleeping') {
            this.state = 'hungry';
        } else throw new Error('wrong event');
        fsmHistory.push(this.state);


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
        if (!event) return ['normal', 'busy', 'hungry', 'sleeping'];
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
            //case '':
            //return ['normal', 'busy', 'hungry', 'sleeping'];
            default:
                return [];
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */

    undo() {
        if (!this.fsmHistory) {
            return false;
        }
        else {
            this.state = this.fsmHistory[this.fsmHistory.length() - 2];
            this.fsmHistory.pop();
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() { }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
