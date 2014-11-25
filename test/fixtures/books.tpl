{extends file='layout.tpl'}
{block name=body}
    <h1>{$books.greeting}</h1>

     {foreach $books.books as $i => $book}
         {include file='book.tpl' $book}
     {foreachelse}
         No books
     {/foreach}

     Total: {$book@total}
{/block}