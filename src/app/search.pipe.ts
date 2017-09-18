import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'search',
    pure: false
})

export class SearchPipe implements PipeTransform {
    transform<T extends Object>(elements: T[], filter: T): Array<T> {
        if (!Array.isArray(elements) || !filter) {
            return elements;
        }

        return elements.filter(element => this.filter(element, filter));
    }
    private filter<T>(element: T, filter: T): boolean {
        for (const field in filter) {
            if (filter[field]) {
                if (!element[field].toString().toLowerCase().includes(filter[field].toString().toLowerCase())) {
                    return false;
                }
            }
        }
        return true;
    }
}