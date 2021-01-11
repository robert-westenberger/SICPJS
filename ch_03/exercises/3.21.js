import {
    make_queue,
    insert_queue,
    delete_queue,
    display,
    front_ptr, rear_ptr, is_pair
} from "../../general/index";


function print_queue(queue) {
    const front = front_ptr(queue);
    if (is_pair(front)) {
        display(front);
    } else {
        console.log(front);
    }
}

// makes pair, head and tail both null
const q1 = make_queue();
print_queue(q1);
// queue is empty, so both the front
// and rear pointer are set to "a"
insert_queue(q1, "a");
print_queue(q1);
// queue is populated, so "b" is both set as the rear ptr
// and the previously final pair of the queue is modified to
// point to the new pair ("b").
insert_queue(q1, "b");
print_queue(q1);

// to delete an item, the front pointer is modified
// so it points to the second item (tail) of the queue.
delete_queue(q1);
print_queue(q1);
delete_queue(q1);
print_queue(q1); // prints [null, [b, null]]
// The queue is empty since its front_ptr is null. (but
// the rear_ptr still exists, even though it does nothing



