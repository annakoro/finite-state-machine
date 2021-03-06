class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        var state, event, i, flag;
        this.state = config.initial;
        this.fsmHistory = new Array();
        this.fsmHistory.push('normal');
        this.i = 0; this.flag = false;
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
        this.fsmHistory.push(state);
        this.i++;
        this.flag = false;
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        // this.state = this.fsmHistory[this.fsmHistory.length-1];
        if (event == 'study' && this.state == 'normal') {
            this.state = 'busy';
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
        //this.clearHistory();
        this.fsmHistory.push(this.state);
        this.i++;
        this.flag = false;
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
            this.flag = true;
            return true;
        }
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.i == this.fsmHistory.length - 1) {
            this.i++;
            return false;
        }
        else if (this.flag) {
            this.i++;
            this.state = this.fsmHistory[this.i];
            return true;
        }
        else return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.i = 0;
        this.fsmHistory.length = 0;
        this.fsmHistory.push('normal');
    }

}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
