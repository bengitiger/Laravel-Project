<?php

namespace App\Models\Repositories;

use App\Models\Entities\ResourceType;
use App\Models\Entities\Ticket_cs;
use DB;
use Illuminate\Support\Facades\Auth;
use Carbon\Carbon;


class TicketCsRepository extends BaseRepository
{
    public function model() {  return 'App\Models\Entities\Ticket_cs';   }
   // public function displaycs($request)
   

    public function displaycs($request)
    {
       // $ticketcs->QUOTE_ID = $request->input('QUOTE_ID'); 
        $qi = $request->input('QUOTE_ID'); 
       // return $this->model->all()->toArray();


       return $this->model->where('active',1)->where('QUOTE_ID', $qi)->get()->keyBy('id')->toArray();
      //return $this->model->orderBy('id', 'desc')->first()->toArray();

       // return $this->model->where('active',1)->where('QUOTE_ID',25850)->get()->keyBy('id')->toArray();
       // return $this->model->where('active',1)->get(['*', DB::raw("'RW' as permission")])->keyBy('id')->toArray();
    }
    public function add($request)
    {   $ticketcs =  new Ticket_cs();    
        $ticketcs->ORDER_ID = $request->input('ORDER_ID');  
        $ticketcs->comment = $request->input('comment');
        $ticketcs->QUOTE_ID = $request->input('QUOTE_ID'); 
        $ticketcs->location_id = $request->input('location_id');   
        $ticketcs->ticket_no = $request->input('ticket_no');   
        $ticketcs->ticket_type_id = $request->input('ticket_type_id');   
        $ticketcs->status = $request->input('status_id');  
        $ticketcs->allocated_user_id = $request->input('user1.id');
        $ticketcs->GROUP_ID = $request->input('group1.id');   
        $ticketcs->CONTACT_PERSON = $request->input('CONTACT_PERSON');   
        $ticketcs->user_id = 1;  
    
        $ticketcs->save();   return $ticketcs;
    }
    public function save($request)
    {     
        $ticketcs =  $this->model->findOrFail($request->input('ticket_no')); 
        $ticketcs->ORDER_ID = $request->input('ORDER_ID');  
        $ticketcs->comment = $request->input('comment');
        $ticketcs->QUOTE_ID = $request->input('QUOTE_ID'); 
        $ticketcs->location_id=1;
        //$ticketcs->location_id = $request->input('location_id');   
        $ticketcs->ticket_no = $request->input('ticket_no');   
        $ticketcs->ticket_type_id = $request->input('ticket_type_id');   
        $ticketcs->status = $request->input('status_id');  
        $ticketcs->allocated_user_id = $request->input('user1.id');
        $ticketcs->GROUP_ID = $request->input('group1.id');   
        $ticketcs->user_id = 1;  
    
        $ticketcs->save();   return $ticketcs;
    }

    public function getlastcsticket($request)
    {
       // $ticketcs->QUOTE_ID = $request->input('QUOTE_ID'); 
        $qi = $request->input('QUOTE_ID'); 
       // return $this->model->all()->toArray();


       return $this->model->orderBy('id', 'desc')->first()->toArray();
      // return $this->model->where('active',1)->where('QUOTE_ID', $qi)->get()->keyBy('id')->toArray();

       // return $this->model->where('QUOTE_ID',25850)->get()->keyBy('id');
       // return $this->model->where('active',1)->get(['*', DB::raw("'RW' as permission")])->keyBy('id')->toArray();
    }

    //---------------------------all done above now new page-------
    public function getByPaginate($request)
    {
        //$qi = $request->input('QUOTE_ID'); 

        $sort = $request->sort;                 $sort = explode('|', $sort);
        $sortBy = $sort[0];                     $sortDirection = $sort[1];
        $perPage = $request->per_page;          $search = $request->filter;

        
        $query = $this->model->orderBy($sortBy, $sortDirection) 
        ->where('active',1)
        ->with('ttype')
        ->with('ttype1')
        ->with('tstatus')
        ->with('v6quotee')
        ->with('userid')
        ->with('auserid')
        ->with('agroupid')
       // ->with('v6items')
        ->with('location');

       // $salesOrderNumber = trim($search['salesOrderNumber']);
        $ticketStatus = trim($search['ticketStatus']); 
        $ticketType = trim($search['ticketType']);
       // $orderStatus = trim($search['orderStatus']);
        $orderLocation = trim($search['orderLocation']);
        $ticket_no = trim($search['ticket_no']);
        $ORDER_ID = trim($search['ORDER_ID']);
        $QUOTE_ID = trim($search['QUOTE_ID']);
        $createdby = trim($search['createdby']);
        $updatedby = trim($search['updatedby']);
        $assigneduser = trim($search['assigneduser']);
        if (count($search['dateRange']) == 2)
        {   $dateRangeFrom = trim($search['dateRange'][0]); $dateRangeTo = trim($search['dateRange'][1]);  }
        else
        {   $dateRangeFrom = '';    $dateRangeTo = '';  }

        if ($dateRangeFrom)
        {   $dateRangeFrom = Carbon::createFromFormat('!d/m/Y', $dateRangeFrom);
            $query->where('created_at', '>=', $dateRangeFrom);
        }
        if ($dateRangeTo)
        {   $dateRangeTo = Carbon::createFromFormat('!d/m/Y', $dateRangeTo);
            $query->where('created_at', '<=', $dateRangeTo);
        }

        if (count($search['dateRangeUpdate']) == 2)
        {   $udateRangeFrom = trim($search['dateRangeUpdate'][0]); $udateRangeTo = trim($search['dateRangeUpdate'][1]);  }
        else
        {   $udateRangeFrom = '';    $udateRangeTo = '';  }

        if ($udateRangeFrom)
        {
            $udateRangeFrom = Carbon::createFromFormat('!d/m/Y', $udateRangeFrom);
            $query->where('updated_at', '>=', $udateRangeFrom);
        }
        if ($udateRangeTo)
        {
            $udateRangeTo = Carbon::createFromFormat('!d/m/Y', $udateRangeTo);
            $query->where('updated_at', '<=', $udateRangeTo);
        }

        if ($ticket_no) {   $like = "%{$ticket_no}%"; $query->where('ticket_no', 'LIKE', $like);  }
        if ($createdby) {   $like = "%{$createdby}%"; $query->where('created_by', 'LIKE', $like);  }
        if ($updatedby) {   $like = "%{$updatedby}%"; $query->where('updated_by', 'LIKE', $like);  }
        if ($assigneduser) {   $like = "%{$assigneduser}%"; $query->where('allocated_user_id', 'LIKE', $like);  }
        if ($ORDER_ID) {   $like = "%{$ORDER_ID}%"; $query->where('ORDER_ID', 'LIKE', $like);  }
        if ($QUOTE_ID) {   $like = "%{$QUOTE_ID}%"; $query->where('QUOTE_ID', 'LIKE', $like);  }
        if ($ticketStatus)  {   $like = "%{$ticketStatus}%";  $query->where('status', 'LIKE', $like);}
        if ($ticketType)  {   $like = "%{$ticketType}%";  $query->where('ticket_type_id', 'LIKE', $like);}
       // if ($salesOrderNumber) {   $like = "%{$salesOrderNumber}%";  $query->where('status', 'LIKE', $like); }
        if ($orderLocation) {   $like = "%{$orderLocation}%";  $query->where('location_id', 'LIKE', $like); }


        return $query->paginate($perPage);
       
       // return $this->model->orderBy('id', 'desc')->first()->toArray();
    }

    public function deleteCsTicket($request)
    {   $testb1 =  $this->model->findOrFail($request->input('id'));
        $testb1->active = 0;   
        $testb1->save();   
        return $testb1;
    }

    public function addfile($request)
    {    // $file=$request->file('files');
        $file=$request->file;

    // $path=$file->getClientOriginalName();
    // if(!Storage::disk('public_uploads')->put($path, $file)) {    return false;   }

  //  $imageName = $file->getClientOriginalName();
   // $request->image->move(public_path('/'), $imageName);

    $file = $request->file;
    $path = storage_path() . '/oms_files';
    $fileEx = $file->getClientOriginalExtension();
    $fileName = $file->getClientOriginalName();
    $file->move($path, $fileName);

        if($file){ 
                 $res="4";
                 $res=$file->getClientOriginalName();
                // $res=$file->all();
                 return $res;
              }

    }
    //--------------------
    public function gettype1ticket($request)
    {
       // $ticketcs->QUOTE_ID = $request->input('QUOTE_ID'); 
        $qi = $request->input('ticket_no'); 
       // return $this->model->all()->toArray();

      // $q1=33;
       return $this->model->where('active',1)->where('ticket_no', $qi)->with('ttype1')->get()->toArray();
      //return $this->model->orderBy('id', 'desc')->first()->toArray();

       // return $this->model->where('active',1)->where('QUOTE_ID',25850)->get()->keyBy('id')->toArray();
       // return $this->model->where('active',1)->get(['*', DB::raw("'RW' as permission")])->keyBy('id')->toArray();
    }



}