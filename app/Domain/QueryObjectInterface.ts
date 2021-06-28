'use strict';

export default interface QueryObjectInterface {
    query(): string;
    
    bindings(): any[];
}
