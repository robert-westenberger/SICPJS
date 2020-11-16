/*
* Insatiable Enterprises, Inc. is a highly decentralized
* congolomerate consisting of many independent divisions
* all over the world. The divisions are interconnected
* by means of a clever networking interfacing scheme
* that makes the entire network appear to any user to be
* connected to a single computer.
* When querying for administrative information from division files,
* its discovered the data structure used varies from division to
* division.
*
* Show how data-directed programming can be used to allow
* administration to query administrative information
* on records that  may be different from division to division.
* For each division, personnel records consist of a single
* file which contains a set of records keyed on employees names.
* Each employee record is itself a set, which is different
* from division to division.
*
* a - Implement global get_record function that retrieves employee
* record from a personnel file. It should be applicable to any divisions
* file. How should the individuals division file be structured?
* What type of information must be supplied?
*
* b - Implement global get_salary func that returns salary
* information from a given employees record from any divisions
* personnel file. HHow should the record be structured in order to make this
* operation work?
*
* c - Same as above, but find_employee_record . Should search all
* division files for the record of a given employee and return the
* record. Assume this func takes as arguments an employee's name
* and a list of all the divisions files.
* d - WhenInsatiabletakesoveranewcompany,whatchangesmustbemadeinordertoincorporate the
* new personnel information into the central system?
* */

import {
    list,
    head,
    tail,
    get,
    is_number,
    is_variable,
    is_pair, display, square, attach_tag, put,
} from "../general/index";