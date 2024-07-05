import React from 'react';
// import './HelpModal.css';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <h2>How to Play</h2>
        <div>
        <ul>
        <li><p>Chain Reaction is a two-player game where players take turns placing atoms on a grid.</p></li>


        <li><p>During each turn, a player can place an atom in an empty cell or in a cell that already contains their atoms.</p></li>

        <li><p>Each cell can hold a limited number of atoms:</p>
        <ul>
            <li>Corner cells can hold up to 1 atom.</li>
            <li>Edge cells can hold up to 2 atoms.</li>
            <li>Center cells can hold up to 3 atoms.</li>
        </ul></li>

        <li><p>When a cell reaches its atom limit and another atom is added, it will burst.</p>
        <ul>
            <li>The atoms in the bursting cell will spread to adjacent cells.</li>
            <li>If an adjacent cell belongs to the opposing player, it will become the current player's cell.</li>
            <li>If the adjacent cell also reaches its limit, it will also burst, potentially creating a <br /><b>"chain reaction"</b>.</li>
        </ul></li>

        <li><p>The game continues until one player successfully eliminates all the opponent's atoms from the grid.</p></li>
        </ul>
        <h3>Other Information</h3>
        <ul>
        <li><p>There are two modes: Online Game and Local Game.</p></li>
        <ul>
        <li><p>In Local Game, you can play with friends on the same device.</p></li>
        
        <li><p>In Online Game, you can either play with a random player or challenge your friends.</p></li></ul>
        
        <li><p>You can add friends in the Profile page.</p></li>
        
        <li><p>Use the Clear Trace button to remove all unfinished games or challenges you have sent to friends.</p></li></ul>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
