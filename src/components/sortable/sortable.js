import React from 'react';
import { SortableContainer, SortableElement, SortableHandle } from 'react-sortable-hoc';

export const SortableItem = SortableElement(({ children, ...props }) => children);

export const SortableList = SortableContainer(({ children, ...props }) => <div {...props}>{children}</div>);
export const SortableDragHandle = SortableHandle(({ children, ...props }) => children);
