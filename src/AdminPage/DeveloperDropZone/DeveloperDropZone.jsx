import React from 'react';


class DeveloperDropZone extends React.Component {
    constructor(props){
        super(props);
        this.onDragOver = this.onDragOver.bind(this);
        this.onDragEnter = this.onDragEnter.bind(this);
    }
    
    onDragOver (e)  {	
        e.stopPropagation();	
        e.preventDefault();	
    }	

    onDragEnter (e)  {	
        e.stopPropagation();	
    }	

    render() {
        const { user, assignTaskToUser } = this.props;
        return (
            <div className='col-xs-4' 
            onDragEnter={this.onDragEnter}
            onDragOver={this.onDragOver}
            onDrop={e => assignTaskToUser(user, e)}>
               <div>{user.firstName + ' ' + user.lastName}</div>
               <div className='well'>
               {user.tasks && user.tasks.length>0 ? user.tasks.map(({_id, summary, status}) => <li key={_id} draggable="true">{summary} {status}</li>):'no tasks yet'}
               </div>
            </div>
        );
    }
}



export  {DeveloperDropZone};