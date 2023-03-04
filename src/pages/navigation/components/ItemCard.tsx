import { Fragment } from 'react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Example from './example';


export interface Props {
    item: any;
}

const ItemCard: React.FC<Props> = ({ }) => {
    return (
        <Fragment>
            <div>
                <DndProvider backend={HTML5Backend} >
                    <Example />
                </DndProvider>
            </div>
        </Fragment >
    );
};

export default ItemCard;
