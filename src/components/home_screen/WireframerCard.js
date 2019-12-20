import React from "react";
import DeleteWireframerModal from "../modals/DeleteWireframerModal"

class WireframerCard extends React.Component {
  confirmDelete = (e) => {
    e.preventDefault();
  }

  render() {
    const { wireframer } = this.props;
    const lastViewed = "Last Viewed: " + wireframer.lastModified;
    console.log("TodoListCard, todoList.id: " + wireframer.id);
    return (
      <div className="card z-depth-0 todo-list-link">
        <DeleteWireframerModal id={wireframer.id}/>
        <div className="card-content blue lighten-4 grey-text text-darken-3">
          <span className="card-title">{wireframer.name}</span>
          <span id="last_modified_stamp">{lastViewed}</span>
          <a
              data-target="modal1"
              class="btn-floating btn-medium waves-effect waves-light blue delete_but btn modal-trigger"
              onClick={this.confirmDelete}
            >
              <i class="material-icons">delete</i>
            </a>
          </div>
      </div>
    );
  }
}

export default WireframerCard;
