"Use client"
import ButtonPaginate from '../buttons/ButtonPaginate'


export default function PaginationPrimary() {
  return (
    <section className="w-full flex items-center justify-end gap-3 mt-4">
        <p className="font-light italic">Showing 1 to 5 of 5 entries</p>
        <ButtonPaginate direction="left"  />
        <ButtonPaginate direction="right"  />
    </section>
  )
}
