class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var state, event, i;
        this.state = config.initial;
        this.fsmHistory = new Array();
        this.fsmHistory.push('normal');
        this.i = 0;
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

        if (event == 'study' && this.state == 'normal') {
            this.state = 'busy';
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
        this.fsmHistory.push(this.state);
        this.i++;
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
        if (this.i == 0) {
            return false;
        }
        else {
            this.i--;
            this.state = this.fsmHistory[this.i];
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.i == this.fsmHistory.length) {
            this.i++;
            return false;
        }
        else {
            this.i++;
            this.state = this.fsmHistory[this.i];
            return true;
        }
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.i = 0;
        this.fsmHistory.length = 0;
    }

}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
